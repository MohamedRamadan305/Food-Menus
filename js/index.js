let display_api = document.getElementById("display_api");
let search_data = document.getElementById("search_data");
let Submit;
let Name_Inp = false;
let Email_Inp = false;
let Phone_Inp = false;
let Age_Inp = false;
let Password_Inp = false;
let Repassword_Inp = false;


      function Enter_navbar() {
        $(".side-nav-menu").animate({left: 0}, 500)
        $(".open-close-icon").removeClass("fa-align-justify");
        $(".open-close-icon").addClass("fa-x");
        for (let i = 0; i < 5; i++) {
            $(".links li").eq(i).animate({top: 0}, (i + 5) * 100)
        }
    }
    
     function Close_navbar() {
        let WidthNav = $(".side-nav-menu .nav-tab").outerWidth(true)
        $(".side-nav-menu").animate({left: -WidthNav}, 500)
    
        $(".open-close-icon").addClass("fa-align-justify");
        $(".open-close-icon").removeClass("fa-x");
        $(".links li").animate({top: 300 }, 500)
    }
    
     function Show_Meals(x) {
        let hasala = "";
    
        for (let i = 0; i < x.length; i++) {
            hasala += `
            <div class="col-md-3">
                    <div onclick="showDetails('${x[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                        <img class="w-100" src="${x[i].strMealThumb}" alt="" srcset="">
                        <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                            <h3>${x[i].strMeal}</h3>
                        </div>
                    </div>
            </div>
            `
        }
    
        display_api.innerHTML = hasala
    }
    
    
     async function Get_Cat() {
        display_api.innerHTML = ""
        $(".inner-load-roll").fadeIn(300)
        search_data.innerHTML = "";
    
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
        response = await response.json()
    
        Show_Cat(response.categories)
        $(".inner-load-roll").fadeOut(300)
    
    }
    
     function Show_Cat(x) {
        let hasala = "";
    
        for (let i = 0; i < x.length; i++) {
            hasala += `
            <div class="col-md-3">
                    <div onclick="Get_CatMeals('${x[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                        <img class="w-100" src="${x[i].strCategoryThumb}" alt="" srcset="">
                        <div class="meal-layer position-absolute text-center text-black p-2">
                            <h3>${x[i].strCategory}</h3>
                            <p>${x[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                        </div>
                    </div>
            </div>
            `
        }
    
        display_api.innerHTML = hasala
    }
    
     async function Get_location() {
        display_api.innerHTML = ""
        $(".inner-load-roll").fadeIn(300)
    
        search_data.innerHTML = "";
    
        let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
        respone = await respone.json()
        console.log(respone.meals);
    
        Show_location(respone.meals)
        $(".inner-load-roll").fadeOut(300)
    
    }
    
     function Show_location(x) {
        let hasala = "";
    
        for (let i = 0; i < x.length; i++) {
            hasala += `
            <div class="col-md-3">
                    <div onclick="Get_Loc_Meals('${x[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                            <i class="fa-solid fa-house-laptop fa-4x"></i>
                            <h3>${x[i].strArea}</h3>
                    </div>
            </div>
            `
        }
    
        display_api.innerHTML = hasala
    }
    
    
     async function Get_Lng() {
        display_api.innerHTML = ""
        $(".inner-load-roll").fadeIn(300)
    
        search_data.innerHTML = "";
    
        let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
        respone = await respone.json()
        console.log(respone.meals);
    
        Show_Lng(respone.meals.slice(0, 20))
        $(".inner-load-roll").fadeOut(300)
    
    }
    
    
     function Show_Lng(x) {
        let hasala = "";
    
        for (let i = 0; i < x.length; i++) {
            hasala += `
            <div class="col-md-3">
                    <div onclick="showIngredients('${x[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                            <h3>${x[i].strIngredient}</h3>
                            <p>${x[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
            </div>
            `
        }
    
        display_api.innerHTML = hasala
    }
    
    
     async function Get_CatMeals(x) {
        display_api.innerHTML = ""
        $(".inner-load-roll").fadeIn(300)
    
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${x}`)
        response = await response.json()
    
    
        Show_Meals(response.meals.slice(0, 20))
        $(".inner-load-roll").fadeOut(300)
    
    }
    
     async function Get_Loc_Meals(x) {
        display_api.innerHTML = ""
        $(".inner-load-roll").fadeIn(300)
    
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${x}`)
        response = await response.json()
    
    
        Show_Meals(response.meals.slice(0, 20))
        $(".inner-load-roll").fadeOut(300)
    
    }
    
    
     async function showIngredients(x) {
        display_api.innerHTML = ""
        $(".inner-load-roll").fadeIn(300)
    
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${x}`)
        response = await response.json()
    
    
        Show_Meals(response.meals.slice(0, 20))
        $(".inner-load-roll").fadeOut(300)
    
    }
    
     async function showDetails(x) {
        Close_navbar()
        display_api.innerHTML = ""
        $(".inner-load-roll").fadeIn(300)
    
        search_data.innerHTML = "";
        let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${x}`);
        respone = await respone.json();
    
        displayDetails(respone.meals[0])
        $(".inner-load-roll").fadeOut(300)
    
    }
    
    
     function displayDetails(meal) {
        
        search_data.innerHTML = "";
    
    
        let ingredients = ``
    
        for (let i = 1; i <= 20; i++) {
            if (meal[`strIngredient${i}`]) {
                ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
            }
        }
    
        let tags = meal.strTags?.split(",")
        if (!tags) tags = []
    
        let tagsStr = ''
        for (let i = 0; i < tags.length; i++) {
            tagsStr += `
            <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
        }
    
    
    
        let hasala = `
        <div class="col-md-4">
                    <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                        alt="">
                        <h2>${meal.strMeal}</h2>
                </div>
                <div class="col-md-8">
                    <h2>Instructions</h2>
                    <p>${meal.strInstructions}</p>
                    <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                    <h3><span class="fw-bolder">x : </span>${meal.strCategory}</h3>
                    <h3>Recipes :</h3>
                    <ul class="list-unstyled d-flex g-3 flex-wrap">
                        ${ingredients}
                    </ul>
    
                    <h3>Tags :</h3>
                    <ul class="list-unstyled d-flex g-3 flex-wrap">
                        ${tagsStr}
                    </ul>
    
                    <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                    <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
                </div>`
    
        display_api.innerHTML = hasala
    }
    
    
     function showSearchInputs() {
        search_data.innerHTML = `
        <div class="row py-4 ">
            <div class="col-md-6 ">
                <input onkeyup="Search_Name(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
            </div>
            <div class="col-md-6">
                <input onkeyup="searchFirstLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
            </div>
        </div>`
    
        display_api.innerHTML = ""
    }
    
     async function Search_Name(term) {
        Close_navbar()
        display_api.innerHTML = ""
        $(".inner-load-roll").fadeIn(300)
    
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        response = await response.json()
    
        response.meals ? Show_Meals(response.meals) : Show_Meals([])
        $(".inner-load-roll").fadeOut(300)
    
    }
    
     async function searchFirstLetter(term) {
        Close_navbar()
        display_api.innerHTML = ""
        $(".inner-load-roll").fadeIn(300)
    
        term == "" ? term = "a" : "";
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
        response = await response.json()
    
        response.meals ? Show_Meals(response.meals) : Show_Meals([])
        $(".inner-load-roll").fadeOut(300)
    
    }
    
     function disContacts() {
        display_api.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
        <div class="container w-75 text-center">
            <div class="row g-4">
                <div class="col-md-6">
                    <input id="nameInput" onkeyup="contactsInputs()" type="text" class="form-control" placeholder="Enter Your Name">
                    <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Special characters and numbers not allowed
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="emailInput" onkeyup="contactsInputs()" type="email" class="form-control " placeholder="Enter Your Email">
                    <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Email not valid *exemple@yyy.zzz
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="phoneInput" onkeyup="contactsInputs()" type="text" class="form-control " placeholder="Enter Your Phone">
                    <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid Phone Number
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="ageInput" onkeyup="contactsInputs()" type="number" class="form-control " placeholder="Enter Your Age">
                    <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid age
                    </div>
                </div>
                <div class="col-md-6">
                    <input  id="passwordInput" onkeyup="contactsInputs()" type="password" class="form-control " placeholder="Enter Your Password">
                    <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid password *Minimum eight characters, at least one letter and one number:*
                    </div>
                </div>
                <div class="col-md-6">
                    <input  id="repasswordInput" onkeyup="contactsInputs()" type="password" class="form-control " placeholder="Repassword">
                    <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid repassword 
                    </div>
                </div>
            </div>
            <button id="Submit" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
        </div>
    </div> `
    Submit = document.getElementById("Submit")
    
    
        document.getElementById("nameInput").addEventListener("focus", () => {
            Name_Inp = true
        })
    
        document.getElementById("emailInput").addEventListener("focus", () => {
            Email_Inp = true
        })
    
        document.getElementById("phoneInput").addEventListener("focus", () => {
            Phone_Inp = true
        })
    
        document.getElementById("ageInput").addEventListener("focus", () => {
            Age_Inp = true
        })
    
        document.getElementById("passwordInput").addEventListener("focus", () => {
            Password_Inp = true
        })
    
        document.getElementById("repasswordInput").addEventListener("focus", () => {
            Repassword_Inp = true
        })
    }
    
     function contactsInputs() {
        if (Name_Inp) {
            if (name_Valid()) {
                document.getElementById("nameAlert").classList.replace("d-block", "d-none")
    
            } else {
                document.getElementById("nameAlert").classList.replace("d-none", "d-block")
    
            }
        }
        if (Email_Inp) {
    
            if (email_Valid()) {
                document.getElementById("emailAlert").classList.replace("d-block", "d-none")
            } else {
                document.getElementById("emailAlert").classList.replace("d-none", "d-block")
    
            }
        }
    
        if (Phone_Inp) {
            if (phone_Valid()) {
                document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
            } else {
                document.getElementById("phoneAlert").classList.replace("d-none", "d-block")
    
            }
        }
    
        if (Age_Inp) {
            if (age_Valid()) {
                document.getElementById("ageAlert").classList.replace("d-block", "d-none")
            } else {
                document.getElementById("ageAlert").classList.replace("d-none", "d-block")
    
            }
        }
    
        if (Password_Inp) {
            if (password_Valid()) 
            {
                document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
            } 
            else {
                document.getElementById("passwordAlert").classList.replace("d-none", "d-block")
    
            }
        }
        if (Repassword_Inp) {
            if (Repassword_Valid()) {
                document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
            } else {
                document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")
    
            }
        }
    
    
        if (name_Valid() && email_Valid() && phone_Valid() && age_Valid() && password_Valid() && Repassword_Valid())
         {
            Submit.removeAttribute("disabled")
         } 
         else {
            Submit.setAttribute("disabled", true)
        }
    }
    
     function name_Valid() {
        return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
    }
    
     function email_Valid() {
        return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
    }
    
     function phone_Valid() {
        return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
    }
    
     function age_Valid() {
        return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
    }
    
     function password_Valid() {
        return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
    }
    
     function Repassword_Valid() {
        return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
    }
    

     $(document).ready(() => {
                Search_Name("").then(() => {
                    $(".load-roll").fadeOut(500)
                    $("body").css("overflow", "visible")
            
                })
            })
            
    $(".side-nav-menu i.open-close-icon").click(() => {
                if ($(".side-nav-menu").css("left") == "0px") {
                    Close_navbar()
                } else {
                    Enter_navbar()
                }
            })
                 
