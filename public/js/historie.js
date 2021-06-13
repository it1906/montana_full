// Vytvořte pole datových objektů v platných formátech JSON (otestujte jejich validitu např. zde: https://jsonformatter.curiousconcept.com/)
// Články s historickými zajímavostmi
const articles = [{
        "title": "Dražba amerického města Garryowen skončila fiaskem. Nikdo ho nechtěl",
        "text": "Město Garryowen v americké Montaně se prodávat nebude. Unikátní dražba obce o dvou obyvatelích u bojiště Little Bighorn skončila trapasem. Sousedství historického místa, kde v roce 1876 indiáni slavně zvítězili nad generálem Custerem, nepomohlo. Nikdo nechtěl přihazovat.",
        "date": "16.8.2012",
        "author": "iROZHLAS",
        "source": "https://www.irozhlas.cz/zpravy-svet/drazba-americkeho-mesta-garryowen-skoncila-fiaskem-nikdo-ho-nechtel_201208160700_kbrezovska",
        "likes": "43",
        "dislikes": "6",
        "gallery": [
            "drazba.jpeg",
        ]
    },
    {
        "title": "Generál Custer měl vítězství na dosah",
        "text": "Little Bighorn je synonymem posledního vzepětí amerických indiánů a ponižující porážky 7. kavalerie americké armády vedené generálem Georgem Armstrongem Custerem v roce 1876. Jak jsem však přímo na místě památné bitvy zjistil, bylo to trochu složitější, než se obvykle popisuje.",
        "date": "25.6.1876",
        "author": "Radiožurnál",
        "source": "https://radiozurnal.rozhlas.cz/general-custer-mel-vitezstvi-na-dosah-6273264",
        "likes": "420",
        "dislikes": "69",
        "gallery": [
            "custer.jpg",
        ]
    },
    {
        "title": "Bizoni z Yellowstonu se přestěhovali na západ. Uprostřed sněhové bouře a bez médií",
        "text": "Šest desítek bizonů z národního parku v Yellowstonu bylo v pondělí vypuštěno v rezervaci Fort Peck v americkém státě Montana, 800 kilometrů na severovýchod od jejich původního domova. Oznámila to agentura AP s tím, že jde o součást programu na opětné osídlení amerického západu tímto zvířecím druhem.",
        "date": "2012",
        "author": "HOSPODÁŘSKÉ NOVINY",
        "source": "https://zahranicni.ihned.cz/c1-55098210-bizoni-z-yellowstonu-se-prestehovali-na-zapad-uprostred-snehove-boure-a-bez-medii",
        "likes": "55",
        "dislikes": "3",
        "gallery": [
            "yellowstone.jpg",
        ]
    },
    {
        "title": "Rezervace indiánů se mění v peklo. Může za to alkohol",
        "text": "Ve státě Montana žije podle sčítání lidu z roku 2005 bezmála 950 tisíc obyvatel. Počet původních obyvatel Ameriky se pohybuje mezi šesti a sedmi procenty. Celoamerický průměr je přitom 0,8 procenta.",
        "date": "15.5.1891",
        "author": "Vendula Křížová",
        "source": "https://zpravy.aktualne.cz/zahranici/rezervace-indianu-se-meni-v-peklo-muze-za-to-alkohol/r~i:article:476067/",
        "likes": "186",
        "dislikes": "31",
        "gallery": [
            "indian.jpg",
        ]
    }
];

$(function () {
    $("h2").on("click", function () {
        $(this).parents(".row").next().toggle(1000);
    });

    function eventsBlock(events) {
        events.forEach((event) => {
            $("#udalosti tbody").append(`<tr>
                <td class="event-year">${event.year}</td>
                <td>
                  <p class="event-name"><i class="fas fa-chevron-down"></i> <a href="${event.url}" target="_new">${event.event}</a></p>
                  <p class="event-detail">${event.detail}</p>
                </td>            
            </tr>`);
        });

        $(".event-detail").hide();

        $(".event-name i, .event-name a").on("mouseover", function () {

            $("#udalosti tr").removeClass("bg-secondary text-white");

            $(this).parents("tr").addClass("bg-secondary text-white");

            $(".event-detail").hide();

            $(this).parent().next().show(150);
        });
    }

    fetch('../historie/data/events.json')
        .then(response => {
            return response.json()
        })
        .then(json => {
            eventsBlock(json);
        })
        .catch(function (error) {
            console.error('Chyba: \n', error);
        });

    function heroesBlock(heroes) {
        heroes.forEach((hero) => {
            $("#postavy .list-group").append(`<li class=" list-group-item list-group-item-secondary">${hero.name}</li>`);
        });


        $("#postavy li:first").addClass('active');
        fillPersonCard(heroes, heroes[0].name);

        $("#postavy li").on("click", function () {
            $("#postavy li").removeClass("active");
            $(this).addClass("active");
            let person = $(this).text();
            $("#portret").slideUp(250, function () {
                fillPersonCard(heroes, person);
            });
            $("#portret").slideDown(250);
        });
    }
    
    function fillPersonCard(heroes, person) {
        let hero = heroes.find(item => {
           return item.name === person
        });
        $(".card-header").html(`<i class="fas fa-star-of-life"></i> <b>${hero.birth}</b> - <i class="fas fa-cross"></i> <b>${hero.death}</b>`);
        $(".card-title").text(hero.name);
        $(".card-text").text(hero.biography);
        $(".card-footer").html(`Odkaz: <a href="${hero.online}">${hero.online}</a>`);
        $(".gallery").empty();
        for (let i = 0; i < hero.portraits.length; i++) {
           $(".gallery").append(`<div class="col-sm-4"><a href="#"><img src="images/${hero.portraits[i]}" alt="" class="img-fluid"></a></div>`);
        }
     }
    fetch('../historie/data/heroes.json')
        .then(response => {
            return response.json()
        })
        .then(json => {
            heroesBlock(json);
        })
        .catch(function (error) {
            console.error('Chyba: \n', error);
        });


    articles.forEach((article) => {
        $("#zpravodaj").append(`    
            <div class="col-sm-6 mt-3 pb-3 border-bottom">
              <article>
                <figure>
                  <img src="/img/${article.gallery[0]}" alt="${article.title}" class="img-fluid">
                </figure>
                <h3>${article.title}</h3>
                <div class="article-text">
                    <p>${article.text}</p>
                    <p><a href="${article.source}" target="_new">Celý článek</a></p>
                </div>
                <div class="article-footer">Autor: ${article.author} 
                <button type="button" class="btn btn-success likes"><i class="fas fa-thumbs-up"></i> <span class="badge badge-light text-dark">${article.likes}</span></button>
                <button type="button" class="btn btn-danger dislikes"><i class="fas fa-thumbs-down"></i> <span class="badge badge-light text-dark">${article.dislikes}</span></button>
                </div>
              </article>
            </div>        
        `);
    });

    $(".article-text").hide();

    $("#zpravodaj h3").on("click", function () {
        $(this).next(".article-text").toggle();
    });

    $(".likes").on("click", function () {
        let likes = parseInt($(this).find("span").text());
        $(this).find("span").text(likes + 1);
    });

    $(".dislikes").on("click", function () {
        let dislikes = parseInt($(this).find("span").text());
        $(this).find("span").text(dislikes + 1);
    });

    let timer = 0;
    window.setInterval(() => {
        timer++;
        $("article figure img").each(function (index, value) {
            $(value)
                .fadeOut(1000, function () {
                    $(value).attr("src", "img/" + articles[index].gallery[timer % articles[index].gallery.length])
                })
                .fadeIn(500);
        });
    }, 5000);
})