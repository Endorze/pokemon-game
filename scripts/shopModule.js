var shopModule = (function () {


    let toggleShopInterface = false;

    const openShop = () => {
        const petShopInterface = document.getElementById("pet-shop-interface");
        if (!toggleShopInterface) {
            console.log("Open shop")
            allowUserMovementInput = false;
            petShopInterface.style.display = "block";
            toggleShopInterface = true;
        } else {
            petShopInterface.style.display = "none"
            toggleShopInterface = false;
            allowUserMovementInput = true;
        }
    }
    return {
        openShop,
    }
})()