const readlineSync = require("readline-sync");
const customerModule = require("./customerManager");
const productModule = require("./productManger");
const orderModule = require("./orderManager");
const paymentModule = require("./payementManager");

function getValidInput(question) {
  let input;
  do {
    input = readlineSync.question(question);
    if (!input) {
      console.log("Ce champ ne peut pas être vide, veuillez réessayer.");
    }
  } while (!input);
  return input;
}

async function main() {
  try {
    console.log("Bienvenue dans ManagerApp !");

    console.log("1. Gerer les Clients");
    console.log("2. Gerer les Produits");
    console.log("3. Gerer les Commande ");
    console.log("4. Gerer Les Payement");
    console.log("5. Quitter");

    const choice = readlineSync.question("Choisissez une option : ");

    switch (choice) {
      case "1":
        console.log("1. Liste des clients");
        console.log("2. Ajouter un client");
        console.log("3. Modifier un client");
        console.log("4. Supprimer un client");
        console.log("5. Retourner Au Menu principal");
        console.log("6. Quitter");
        const choix = readlineSync.question("Choisissez une option :");

        switch (choix) {
          case "1":
            const customer = await customerModule.getCustomer();
            console.table(customer);
            main();
            break;
          case "2":
            const name = getValidInput("Nom du client: ");
            const address = getValidInput("Address du  client: ");
            const mail = await customerModule.getEmailClient();

            let mailExist = true;
            let email;

            while (mailExist) {
              email = getValidInput("Email du client: ");
              mailExist = false;

              for (let i = 0; i < mail.length; i++) {
                if (email === mail[i]) {
                  mailExist = true;
                  break;
                }
              }

              if (mailExist) {
                console.log(
                  `L'email ${email} appartient déjà à un client. Veuillez réessayer.`
                );
              }
            }
            const phones = await customerModule.getPhoneClient();
            let phoneExist = true;
            let phone;

            while (phoneExist) {
              phone = getValidInput("Téléphone du client: ");
              phoneExist = false;
              for (let i = 0; i < phones.length; i++) {
                if (phone === phones[i]) {
                  phoneExist = true;
                  break;
                }
              }

              if (phoneExist) {
                console.log(
                  `Le numéro de téléphone ${phone} appartient déjà à un client. Veuillez réessayer.`
                );
              }
            }
            const customerId = await customerModule.addCustomer(
              name,
              address,
              email,
              phone
            );
            console.log(`Client ajouté avec l'id ${customerId}`);
            main();
            break;

          case "3":
            const clients = await orderModule.getClient();
            let cmdExists = false;
            let id;

            while (!cmdExists) {
              id = getValidInput(`Entrez l'id du client : `);
              id = parseInt(id);
              for (let i = 0; i < clients.length; i++) {
                if (id === clients[i]) {
                  cmdExists = true;
                  console.log("Client trouvé, id:", id);
                  break;
                }
              }

              if (!cmdExists) {
                console.log("Ce client n'existe pas, veuillez réessayer.");
              }
            }

            const newName = getValidInput("Entrez le  nouveau nom: ");
            const newAdress = getValidInput("Nouvelle Adress du client: ");

            const newMail = await customerModule.getEmailClient();
            let newMailExist = true;
            let newEmail;

            while (newMailExist) {
              newEmail = getValidInput("newEmail du client: ");
              newMailExist = false;
              for (let i = 0; i < newMail.length; i++) {
                if (newEmail === newMail[i]) {
                  newMailExist = true;
                  break;
                }
              }

              if (newMailExist) {
                console.log(
                  `L'newEmail ${newEmail} appartient déjà à un client. Veuillez réessayer.`
                );
              }
            }

            const newPhone = getValidInput("Nouveau numero de téléphone: ");

            await customerModule.updateCustomer(
              id,
              newName,
              newAdress,
              newEmail,
              newPhone
            );
            console.log("Client modifié");
            main();
            break;
          case "4":
            const deleteId = getValidInput("ID du client à supprimer: ");
            await customerModule.destroyCustomer(deleteId);

            main();
            break;
          case "5":
            main();
            break;
          case "6":
            console.log("Au revoir !");
            break;

          default:
            console.log("Veuillez choisir une option entre 1 et 6");
            main();
            break;
        }

        break;

      case "2":
        console.log("1. Liste des produits");
        console.log("2. Ajouter un produit");
        console.log("3. Modifier un produit");
        console.log("4. Supprimer un produit");
        console.log("5. Retourner Au Menu principal");
        console.log("6. Quitter");
        const choix2 = readlineSync.question("Choisissez une option :");
        switch (choix2) {
          case "1":
            const products = await productModule.getProduct();
            console.table(products);
            main();
            break;

          case "2":
            const name = getValidInput("Nom du produit: ");
            const description = getValidInput("description du  produit: ");
            let price;
            while (true) {
              price = getValidInput("prix du produit: ");
              if (!isNaN(price) && price.trim() !== "") {
                price = parseFloat(price);
                break;
              }
              console.log("Le prix doit etre un nombre.");
            }

            let stock;
            while (true) {
              stock = getValidInput("stock du produit: ");
              if (
                !isNaN(stock) &&
                Number.isInteger(parseFloat(stock)) &&
                stock.trim() !== ""
              ) {
                stock = parseInt(stock);
                break;
              }
              console.log("Le stock doit etre un nombre.");
            }

            console.log(`Prix: ${price}, Stock: ${stock}`);
            const category = getValidInput("category du produit: ");
            const barcodes = await productModule.getCodeProduct();
            let barcodeExist = true;
            let barcode;

            while (barcodeExist) {
              barcode = getValidInput("Barre-code du produit: ");
              barcodeExist = false;
              for (let i = 0; i < barcodes.length; i++) {
                if (barcode === barcodes[i]) {
                  barcodeExist = true;
                  break;
                }
              }

              if (barcodeExist) {
                console.log(
                  `Le code-barres ${barcode} appartient déjà à un autre produit. Veuillez réessayer.`
                );
              }
            }
            const status = getValidInput("status du produit: ");
            const productId = await productModule.addProduct(
              name,
              description,
              price,
              stock,
              category,
              barcode,
              status
            );
            console.log(`Produit ajouté avec l'id ${productId}`);
            main();
            break;

          case "3":
            const prouit = await productModule.getProduit();
            let cmdExists = false;
            let id;

            while (!cmdExists) {
              id = getValidInput(`Entrez l'id du produit : `);
              id = parseInt(id);
              for (let i = 0; i < prouit.length; i++) {
                if (id === prouit[i]) {
                  cmdExists = true;
                  console.log("produit trouvé, id:", id);
                  break;
                }
              }

              if (!cmdExists) {
                console.log("Ce produit n'existe pas, veuillez réessayer.");
              }
            }
            const newName = getValidInput(
              "Entrez le  nouveau nom du produit: "
            );
            const newDescription = getValidInput(
              "Nouvelle description du produit: "
            );
            let newPrice;
            while (true) {
              newPrice = getValidInput("prix du produit: ");
              if (!isNaN(newPrice) && newPrice.trim() !== "") {
                newPrice = parseFloat(newPrice);
                break;
              }
              console.log("Le prix doit etre un nombre.");
            }

            let newStock;
            while (true) {
              newStock = getValidInput("newStock du produit: ");
              if (
                !isNaN(newStock) &&
                Number.isInteger(parseFloat(newStock)) &&
                newStock.trim() !== ""
              ) {
                newStock = parseInt(newStock);
                break;
              }
              console.log("Le stock doit etre un nombre.");
            }
            const newcategory = getValidInput(
              "Nouvelle catégorie du produit: "
            );
            const newbBarcodes = await productModule.getCodeProduct();
            let newBarcodeExist = true;
            let newBarcode;

            while (newBarcodeExist) {
              newBarcode = getValidInput("Nouveau code-barres: ");
              newBarcodeExist = false;
              for (let i = 0; i < newbBarcodes.length; i++) {
                if (newBarcode === newbBarcodes[i]) {
                  newBarcodeExist = true;
                  break;
                }
              }

              if (newBarcodeExist) {
                console.log(
                  `Le code-barres ${newBarcode} appartient déjà à un autre produit. Veuillez réessayer.`
                );
              }
            }
            const newStatus = getValidInput("Nouveau statut du produit: ");

            await productModule.updateProduct(
              id,
              newName,
              newDescription,
              newPrice,
              newStock,
              newcategory,
              newBarcode,
              newStatus
            );
            console.log("produit modifié");
            main();
            break;
          case "4":
            const proui = await productModule.getProduit();
            let cExists = false;
            let deleteId;

            while (!cExists) {
              deleteId = getValidInput(`ID du produit à supprimer: `);
              deleteId = parseInt(deleteId);
              for (let i = 0; i < proui.length; i++) {
                if (deleteId === proui[i]) {
                  cExists = true;
                  console.log("produit trouvé, Id:", deleteId);
                  break;
                }
              }

              if (!cExists) {
                console.log("Ce produit n'existe pas, veuillez réessayer.");
              }
            }
            await productModule.destroyProduct(deleteId);
            console.log("Produit supprimé");
            main();
            break;
          case "5":
            main();
            break;
          case "6":
            console.log("Au revoir !");
            break;

          default:
            console.log("Veuillez choisir une option entre 1 et 6");
            break;
        }

        break;

      case "3":
        console.log("1. Liste des commandes");
        console.log("2. Ajouter un commande");
        console.log("3. Modifier un commande");
        console.log("4. Supprimer un commande");
        console.log("5. Retourner Au Menu principal");
        console.log("6. Quitter");
        console.log("7. Liste les details d'une commandes");
        const choixx = readlineSync.question("Choisissez une option :");

        switch (choixx) {
          case "1":
            const order = await orderModule.getOrder();
            console.table(order);
            main();
            break;

          case "7":
            const comman = await orderModule.getOrderById();
            let cmdExist = false;
            let cId;
            while (!cmdExist) {
              cId = getValidInput(`Entrez l'id de la commande : `);
              cId = parseInt(cId);
              for (let i = 0; i < comman.length; i++) {
                if (cId === comman[i]) {
                  cmdExist = true;
                  console.log("commande trouvé, id:", cId);
                  break;
                }
              }

              if (!cmdExist) {
                console.log("Cette commande n'existe pas, veuillez réessayer.");
              }
            }
            const orderDetails = await orderModule.getDetailByOrderId(cId);
            console.table(orderDetails);
            main();
            break;

          case "2":
            const datePurchase = getValidInput(
              "Entrez la date de la commande: "
            );

            const deliveryAddress = getValidInput(`l'address de livraison:  `);

            const client = await orderModule.getClient();
            let clientExists = false;
            let customerId;

            while (!clientExists) {
              customerId = getValidInput(`l'id du client: `);

              for (let i = 0; i < client.length; i++) {
                if (Number(customerId) === client[i]) {
                  clientExists = true;
                  console.log("Client trouvé, id:", customerId);
                  break;
                }
              }

              if (!clientExists) {
                console.log("Ce client n'existe pas, veuillez réessayer.");
              }
            }

            const tracks = await orderModule.getNumber();
            let trackExist = true;
            let track;

            while (trackExist) {
              track = getValidInput("Numéro de suivi la commande: ");
              trackExist = false;
              for (let i = 0; i < tracks.length; i++) {
                if (track === tracks[i]) {
                  trackExist = true;
                  break;
                }
              }

              if (trackExist) {
                console.log(
                  `Le numéro de suivi ${track} existe déjà. Veuillez réessayer.`
                );
              }
            }

            const statusOrder = getValidInput("status de la commande: ");
            const commande = {
              date_purchase: datePurchase,
              delivery_address: deliveryAddress,
              customer_id: customerId,
              track_number: track,
              status: statusOrder,
            };
            console.log(commande);

            const mesDetails = [];

            let cmd = true;
            while (cmd) {
              const details = {};

              console.log("Entrez un details de la commande: ");

              const produit = await productModule.getProduit();
              let produitExists = false;
              let produitId;

              while (!produitExists) {
                produitId = details.produitId = getValidInput(
                  `Entrez l'id du produit : `
                );

                produitId = parseInt(details.produitId);

                for (let i = 0; i < produit.length; i++) {
                  if (produitId === produit[i]) {
                    produitExists = true;
                    console.log("Produit trouvé, id:", produitId);
                    break;
                  }
                }

                if (!produitExists) {
                  console.log("Ce produit n'existe pas, veuillez réessayer.");
                }
              }

              while (true) {
                details.price = getValidInput("Entrez le prix du produit : ");
                if (!isNaN(details.price) && details.price.trim() !== "") {
                  details.price = parseFloat(details.price);
                  break;
                }
                console.log("Veuillez entrer un nombre valide pour le prix.");
              }

              while (true) {
                details.quantity = getValidInput(
                  "Entrez la quantité du produit : "
                );
                if (
                  !isNaN(details.quantity) &&
                  Number.isInteger(parseFloat(details.quantity)) &&
                  details.quantity.trim() !== ""
                ) {
                  details.quantity = parseInt(details.quantity);
                  break;
                }
                console.log(
                  "Veuillez entrer un nombre entier valide pour la quantité."
                );
              }

              console.log(
                `Prix: ${details.price}, Quantité: ${details.quantity}`
              );

              mesDetails.push(details);
              console.log("Détails de la commande:", mesDetails);

              const tmp = getValidInput(
                "Appuyez sur : \n A pour ajouter un autre produit; \n S pour enregistrer la commande; \n Z pour quitter : "
              );

              switch (tmp.toUpperCase()) {
                case "A":
                  break;
                case "S":
                  cmd = false;
                  break;
                case "Z":
                  console.log("Commande annulée.");
                  main();
                  break;
                default:
                  console.log("Option non reconnue. Veuillez réessayer.");
                  break;
              }
            }

            const orderId = await orderModule.addOrder(commande);

            console.log(`La commande ajouté avec l'id ${orderId}`);

            for (let i = 0; i < mesDetails.length; i++) {
              const detail = mesDetails[i];
              const pu = await orderModule.getPrix(detail.produitId);

              detail.price = pu * detail.quantity;

              try {
                await orderModule.addDetail(
                  orderId,
                  detail.produitId,
                  detail.quantity,
                  detail.price
                );
                console.log("Détail enregistré:", detail);
              } catch (err) {
                console.error("Erreur lors de l'ajout du détail:");
              }
            }
            main();
            break;

          case "3":
            const command = await orderModule.getOrderById();
            let cmdExists = false;
            let updateId;

            while (!cmdExists) {
              updateId = getValidInput(`Entrez l'id de la commande : `);
              updateId = parseInt(updateId);
              for (let i = 0; i < command.length; i++) {
                if (updateId === command[i]) {
                  cmdExists = true;
                  console.log("commande trouvé, id:", updateId);
                  break;
                }
              }

              if (!cmdExists) {
                console.log("Cette commande n'existe pas, veuillez réessayer.");
              }
            }
            const newDate = getValidInput(
              "Entrez la nouvelle date de la commande: "
            );
            const newAdress = getValidInput(
              "Nouvelle adresse de la livraison: "
            );
            const newClient = await orderModule.getClient();
            let newClientExists = false;
            let nCustomerId;

            while (!newClientExists) {
              nCustomerId = getValidInput(`l'id du newClient: `);

              for (let i = 0; i < newClient.length; i++) {
                if (Number(nCustomerId) === newClient[i]) {
                  newClientExists = true;
                  console.log("newClient trouvé, id:", nCustomerId);
                  break;
                }
              }

              if (!newClientExists) {
                console.log("Ce newClient n'existe pas, veuillez réessayer.");
              }
            }

            const newTracks = await orderModule.getNumber();
            let newTrackExist = true;
            let newTrack;

            while (newTrackExist) {
              newTrack = getValidInput("Nouveau numéro de suivi: ");
              newTrackExist = false;
              for (let i = 0; i < newTracks.length; i++) {
                if (newTrack === newTracks[i]) {
                  newTrackExist = true;
                  break;
                }
              }

              if (newTrackExist) {
                console.log(
                  `Le numéro de suivi ${newTrack} existe déjà. Veuillez réessayer.`
                );
              }
            }

            const newStatus = getValidInput("Nouveau statut de la commande: ");

            const newCommande = {
              date_purchase: newDate,
              customer_id: nCustomerId,
              delivery_address: newAdress,
              track_number: newTrack,
              status: newStatus,
            };

            console.log("Nouvelle commande:", newCommande);

            const mesNewDetails = [];
            let newcCmd = true;

            while (newcCmd) {
              const details = {};
              console.log("Entrez un nouveau détail de la commande: ");

              const produit = await productModule.getProduit();
              let produitExists = false;
              let produitId;

              while (!produitExists) {
                produitId = details.produitId = getValidInput(
                  `Entrez l'id du produit : `
                );

                produitId = parseInt(details.produitId);

                for (let i = 0; i < produit.length; i++) {
                  if (produitId === produit[i]) {
                    produitExists = true;
                    console.log("Produit trouvé, id:", produitId);
                    break;
                  }
                }

                if (!produitExists) {
                  console.log("Ce produit n'existe pas, veuillez réessayer.");
                }
              }

              details.newPrice = getValidInput(`Entrez le prix du produit : `);
              while (isNaN(details.newPrice) || details.newPrice <= 0) {
                console.log("Le prix doit être un nombre valide.");
                details.newPrice = getValidInput(
                  `Entrez le prix du produit : `
                );
              }

              details.newQuantity = getValidInput(
                `Entrez la quantité du produit : `
              );
              while (isNaN(details.newQuantity) || details.newQuantity <= 0) {
                console.log("La quantité doit être un nombre valide.");
                details.newQuantity = getValidInput(
                  `Entrez la quantité du produit : `
                );
              }

              mesNewDetails.push(details);
              console.log("Nouveaux détails de la commande:", mesNewDetails);

              const newTmp = getValidInput(
                "Appuyez sur : \n A pour ajouter un autre produit; \n S pour enregistrer la commande; \n Z pour quitter : "
              );

              switch (newTmp.toUpperCase()) {
                case "A":
                  break;
                case "S":
                  newcCmd = false;
                  break;
                case "Z":
                  console.log("Commande annulée.");
                  return;
                default:
                  console.log("Option non reconnue. Veuillez réessayer.");
                  break;
              }
            }

            await orderModule.updateOrder(updateId, newCommande);
            console.log(`Commande avec un nouveau ID : ${updateId} modifiée `);

            for (let i = 0; i < mesNewDetails.length; i++) {
              const detail = mesNewDetails[i];

              if (
                !detail.produitId ||
                isNaN(detail.newPrice) ||
                isNaN(detail.newQuantity)
              ) {
                console.log(
                  `Erreur : détail invalide pour le produit ID: ${detail.produitId}`
                );
                continue;
              }

              console.log(
                `Ajout d'un nouveau détail pour le produit ID: ${detail.produitId}`
              );
              await orderModule.addDetail(
                updateId,
                detail.produitId,
                detail.newQuantity,
                detail.newPrice
              );
              console.log("Détail ajouté avec succès");
            }
            main();

            break;

          case "4":
            const commandes = await orderModule.getOrderById();
            let cmdExistss = false;
            let deleteId;

            while (!cmdExistss) {
              deleteId = getValidInput(`Entrez l'id de la commandes : `);
              deleteId = parseInt(deleteId);
              for (let i = 0; i < commandes.length; i++) {
                if (deleteId === commandes[i]) {
                  cmdExistss = true;
                  console.log("commande trouvé, id:", deleteId);
                  break;
                }
              }

              if (!cmdExistss) {
                console.log("Cette commande n'existe pas, veuillez réessayer.");
              }
            }
            await orderModule.destroyOrder(deleteId);
            console.log("Commandes suprimé avec ");
            
            main();
            break;
          case "5":
            main();
            break;
          case "6":
            console.log("Au revoir !");
            break;

          default:
            console.log("Veuillez choisir une option entre 1 et 7");
            break;
        }
        break; 
      case "4":
        console.log("1. Liste des payements");
        console.log("2. Ajouter un payement");
        console.log("3. Modifier un payement");
        console.log("4. Supprimer un payement");
        console.log("5. Retourner Au Menu principal");
        console.log("6. Quitter");
        const choixP = readlineSync.question("Choisissez une option :");

        switch (choixP) {
          case "1":
            const payments = await paymentModule.getPayement();
            console.log(payments);
            main();
            break;

          case "2":
            const command = await orderModule.getOrderById();
            let cmdExists = false;
            let orderId;

            while (!cmdExists) {
              orderId = getValidInput(`Entrez l'id de la commande : `);
              orderId = parseInt(orderId);
              for (let i = 0; i < command.length; i++) {
                if (orderId === command[i]) {
                  cmdExists = true;
                  console.log("commande trouvé, id:", orderId);
                }
              }
              if (!cmdExists) {
                console.log("Cette commande n'existe pas, veuillez réessayer.");
              }
            }
            const datePayement = getValidInput("Date du paiement: ");
            let amount;
            while (true) {
              amount = getValidInput("le montant: ");
              if (!isNaN(amount) && amount.trim() !== "") {
                amount = parseFloat(amount);
                break;
              }
              console.log("Le montant doit etre un nombre.");
            }
            const payementMethod = getValidInput("Méthode de paiement : ");

            const paymentId = await paymentModule.addPayement(
              orderId,
              datePayement,
              amount,
              payementMethod
            );
            console.log(`Paiement ajouté avec l'ID ${paymentId}`);
            main();
            break;

          case "3":
            const newCommand = await orderModule.getOrderById();
            let newCmdExists = false;
            let newOrderId;

            while (!newCmdExists) {
              newOrderId = getValidInput(
                `Entrez l'id de la commande à payer : `
              );
              newOrderId = parseInt(newOrderId);

              for (let i = 0; i < newCommand.length; i++) {
                if (newOrderId === newCommand[i]) {
                  newCmdExists = true;
                  console.log("Commande trouvée, id:", newOrderId);
                }
              }

              if (!newCmdExists) {
                console.log("Cette commande n'existe pas, veuillez réessayer.");
              }
            }

            const newDatePayement = getValidInput(
              "Nouvelle date du paiement : "
            );
            let newAmount;
            while (true) {
              newAmount = getValidInput("le montant: ");
              if (!isNaN(newAmount) && newAmount.trim() !== "") {
                newAmount = parseFloat(newAmount);
                break;
              }
              console.log("Le montant doit etre un nombre.");
            }
            const newPayementMethod = getValidInput(
              "Nouvelle méthode de paiement : "
            );

            const newPayement = {
              date_payement: newDatePayement,
              amount: newAmount,
              payement_method: newPayementMethod,
              order_id: newOrderId,
            };

            await paymentModule.updatePayement(newPayement);

            console.log("Paiement modifié avec succès.");

            main();
            break;
          case "4":
            const pay = await paymentModule.getpay();
            let cmdExistss = false;
            let deleteId;

            while (!cmdExistss) {
              deleteId = getValidInput(`Entrez l'id du payement : `);
              deleteId = parseInt(deleteId);
              for (let i = 0; i < pay.length; i++) {
                if (deleteId === pay[i]) {
                  cmdExistss = true;
                  console.log("payement trouvé, id:", deleteId);
                  break;
                }
              }

              if (!cmdExistss) {
                console.log("Cette payement n'existe pas, veuillez réessayer.");
              }
            }

            await paymentModule.destroyPayement(deleteId);
            console.log("Paiement supprimé");
            main();
            break;

          case "5":
            main();
            break;

          case "6":
            console.log("Au revoir !");
            break;

          default:
            console.log("Veuillez choisir une option entre 1 et 6");
            main();
            break;
        }
        break;
      case "5":
        console.log("Au revoir !");
        break;

      default:
        console.log("Veuillez choisir une option entre 1 et 6");
        main();
        break;
    }
  } catch (error) {
    console.error(
      "une Erreur est survenue veuillez relancer l'application",
      error
    );
  }
}

main();
