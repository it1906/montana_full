let pamatky = [
    {
        "id": "yellowstone",
        "foto": "yellowstone.jpg",
        "info": " Yellowstonský národní park se rozkládá na ploše 8981 km2 a na jeho území se nachází jezera, kaňony, řeky a pohoří. Součástí parku je Yellowstonské jezero, které patří mezi největší vysoko položená jezera Severní Ameriky. Jezero se nachází uprostřed největšího supervulkánu kontinentu, známého jako Yellowstonská kaldera. Tato kaldera je považována za aktivní vulkán, který za poslední dva miliony let několikrát vybuchl obrovskou silou. Plášťový chochol ale patrně nebude zdrojem vulkanismu. V Yellowstonském národním parku se nachází zhruba polovina všech světových typů geotermálních jevů, které pohání zdejší trvající vulkanismus. Většinu rozlohy parku pokrývají horniny pocházející z vulkanických erupcí. Park je hlavní částí Velkého yellowstonského ekosystému, jenž je největším zbývajícím a takřka nedotčeným ekosystémem mírného podnebného pásu zemské severní hemisféry."
    },
    {
        "id": "glacier",
        "foto": "glacier.jpg",
        "info": " Národní park Glacier (v anglickém originále Glacier National Park, kde Glacier znamená ledovec či ledovcový) je ve Spojených státech amerických v Montaně, u hranic s kanadskými provinciemi Alberta a Britská Kolumbie. Má rozlohu a 4 047 km² a obsahuje mimo jiné dva hřebeny Skalistých hor a přes 130 pojmenovaných jezer. Společně s kanadským parkem Waterton Lakes je součástí světového přírodního dědictví UNESCO jako „Mezinárodní park míru Waterton-Glacier“."
    },
    {
        "id": "missoula",
        "foto": "missoula.jpg",
        "info": "Missoula je město ležící na západě amerického státu Montana. Je sídlem okresu Missoula Country. V roce 2010 žilo ve městě 66 788 obyvatel, v celém okrese pak 109 299 obyvatel. Od roku 1920 Missoula trvale rostla. V roce 2000 se Missoula stala druhým nejlidnatějším městem státu Montana. Od roku 2000 je Missoula třetí nejrychleji rostoucí město ve státě Montana. Missoula byla založena v roce 1860 jako Hellgate Trading Post, později byla přejmenovála na Missoula Mills (Missoula podle domorodého označení oblasti a Mills podle prosperujícího mlýnu a pily, což byl první průmysl v Missoule). Slovo Mills bylo z názvu odstraněno v názvu v roce 1877. Missoule se přezdívá zahradní město podle rozlehlých sadů, které lemovaly periferii města a podle velkých květinových a zeleninových zahrad, které vlastnili Cyrus a William McWhirk, a které tvořily východní vstup do města. Přestože město vzniklo jako obchodní centrum s zemědělským a dřevozpracujícím průmyslem, základem současné ekonomiky Missoule je vzdělávání, státní správa, zdravotnictví, cestovní ruch a služby."
    },
    {
        "id": "littlebighorne",
        "foto": "littlebighorne.jpg",
        "info": " Bitva u Little Bighornu je událost, která byla střetnutím mezi armádou Spojených států amerických a válečníky indiánských kmenů Lakotů, severních Šajenů a Arapahů, která se odehrála dne 25. června 1876 v Montaně v USA. Vojáky 7. kavalerie vedl podplukovník George Armstrong Custer, kterému Lakotové říkali Žlutý vlas."
    },
    {
        "id": "granite",
        "foto": "granite.jpg",
        "info": " Granite je město duchů v Granite County, Montana, Spojené státy americké, tři míle východně od města Philipsburg. Žula v 90. letech 19. století prosperovala jako město na těžbu stříbra a nyní je zcela opuštěná. Stát Montana udržuje dům důlního dozorce a ruiny odborové haly jako Státní park Granite Ghost Town."
    },


]


$(function () {
    $("#mapa circle ").hide();
    $("#mista").on('click', function () {
        $("#mapa circle").toggle(500);
    });
    let before = ''; 
    $("#mapa path").on('mouseenter', function () {
        before = $(this).css('fill');
        $(this).css('fill', 'grey');
        $(this).popover({
            'trigger': 'hover',
            'placement': 'top',
        });

    });
    $("#mapa path").on('mouseleave', function(){
        $(this).css('fill', before);
    });
    $("#mapa circle").on('click', function(){
        let id = $(this).attr('id');
        $("#mapa circle").css('fill','purple');
        $(this).css('fill','red');
        let pamatka = pamatky.find(item => {return item.id == id});
        $('#informace').slideUp( function(){$('#informace').html(`<div class=" col-12"><h2>${pamatka.id}</small></h2></div><div class="col-4"><img src="../img/${pamatka.foto}" class="img-fluid"></div><div class="col-8"><p>${pamatka.info}</p>`)});
        $('#informace').slideDown();
    });    

})