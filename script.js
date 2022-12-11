window.addEventListener('scroll', function (){
    const header =document.querySelector('.header-wrapper');
    header.classList.toggle('sticky', window.scrollY >0);
})

// user review



    fetch("https://reqres.in/api/users?page=1&per_page=4", {
        method: "GET",
    })
        .then(function (text1) {
            if (text1.status !== 200) {
                throw text1.status;
            }
            return text1.json();
        })
        .then(function (text2) {
            let reviewContainer = document.getElementById("container-instructors");
            text2.data.forEach((item) => {
                let div = document.createElement("div");
                div.classList.add("image-div");

                let avatarDiv = document.createElement("div");
                let img = document.createElement("img");
                img.classList.add("instructor-image");
                img.src = item.avatar;
                img.alt = "avatar";
                avatarDiv.appendChild(img);

                let name = document.createElement("h2");
                name.innerText = item.first_name + " " + item.last_name;


                div.appendChild(avatarDiv);
                div.appendChild(name);

                reviewContainer.appendChild(div);
            });
        });

//slider

let imageData = [
    {
        id: 1,
        imageUrl: "https://cdn.mos.cms.futurecdn.net/aq9CcMN43HnnfnJnpk6gRL-1200-80.jpg.webp",
        slideTitle: "The \'Phantom Galaxy\'\n"
    },
    {
        id: 2,
        imageUrl: "https://cdn.mos.cms.futurecdn.net/AoWXgnHSxAAPxqymPQMQYL-1200-80.jpg.webp",
        slideTitle: "Carina Nebula"
    },
    {
        id: 3,
        imageUrl: "https://cdn.mos.cms.futurecdn.net/jTNKUAeoKHeoaCcHkrKsxC-1200-80.jpg.webp",
        slideTitle: "The Pillars of Creation\n"
    },
    {
        id: 4,
        imageUrl: "https://cdn.mos.cms.futurecdn.net/xzJ5BqnKVUdjZFoCMJZ3w9-1200-80.jpeg.webp",
        slideTitle: "'Bones' of a spiral galaxy\n"
    }
]

let arrowLeft = document.getElementById('arrow-left');
let arrowRight = document.getElementById('arrow-right');
let sliderContent = document.getElementById('slider-content');
let sliderIndex = 0;

function createDivSlides() {
    const divSlide = document.createElement('div');
    divSlide.classList.add('slide');
    return divSlide;
}
function createImgTag(item) {
    const imageTag = document.createElement('img');
    imageTag.setAttribute('src', item.imageUrl);
    imageTag.setAttribute('alt', item.slideTitle);
    imageTag.classList.add('image');
    return imageTag;
}
function createDots(){
    const dotWrapper = document.createElement('div');
    dotWrapper.classList.add('dot-wrapper');
    imageData.forEach(element =>{
        let dot = document.createElement('div');
        dot.classList.add('dot');
        let dotId = element.id;
        if (dotId===sliderIndex + 1){
            dot.classList.add('active-dot');
        }else {
            dot.classList.remove('active-dot');
        }
        dotWrapper.appendChild(dot);
        function dotChange(){
            sliderIndex = dotId-1;
            slide();
        }
        dot.addEventListener('click', dotChange);
    })
    return dotWrapper;
}

function slide(){
    sliderContent.innerHTML=" ";
    const slideItem = createDivSlides(imageData[sliderIndex]);
    const imgTag = createImgTag(imageData[sliderIndex]);
    const dotElement = createDots(imageData[sliderIndex]);
    slideItem.appendChild(imgTag);
    sliderContent.appendChild(slideItem);
    sliderContent.appendChild(dotElement);
}
function arrowLeftClick(){
    if (sliderIndex==0){
        sliderIndex=imageData.length-1;
        slide();
        return;
    }
    sliderIndex--;
    slide();
}

function arrowRightClick(){
    if (sliderIndex==imageData.length-1){
        sliderIndex= 0;
        slide();
        return;
    }
    sliderIndex++;
    slide();
}

arrowLeft.addEventListener('click', arrowLeftClick);


arrowRight.addEventListener('click', arrowRightClick);

setInterval(()=>{arrowRightClick()}, 3000);
slide();

//validation form

let registrationForm = document.getElementById('regForm');

registrationForm.addEventListener('submit', function (event) {
    event.preventDefault();
    let errors = {};

    let name = document.getElementById('Name').value;
    if (name === "") {
        errors.name = 'Name field can not be empty';
    }
    let emailField = document.getElementById('Email').value;
    let emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (emailField === "") {
        errors.email = "Email cant be empty";
    }
    if (!emailField.match(emailPattern)) {
        errors.email = 'Your email is invalid';
    }

    let textArea = document.getElementById('Text').value;
    if (textArea==="" || textArea.length<10) {
        errors.text = 'You have to enter message (min. 20 characters)';
    }
    document.querySelectorAll('.error-text').forEach(item =>{
        item.textContent = " ";
    })
    for (let key in errors) {
        let errorText = document.getElementById('error_' + key);
        if (errorText) {
            errorText.innerText = errors[key];
        }
    }
    if (Object.keys(errors).length===0) {
        registrationForm.submit();
    }
});

//hamburger
function toggleMenu(){
    const menuToggle = document.querySelector('.menuToggle');
    const navigation = document.querySelector('.navigation');
    menuToggle.classList.toggle('active');
    navigation.classList.toggle('active');
}

