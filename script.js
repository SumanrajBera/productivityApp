const dateElement = document.querySelector(".date")
const timeElement = document.querySelector(".time")
const dayElement = document.querySelector(".day")

const menu = document.querySelector(".menu")
const customPanel = document.querySelector(".customisation")

const nameElem = document.querySelector(".nameElem")
const nameInput = document.querySelector("#name");
const nameBtn = document.querySelector(".setName");

const bannerElem = document.querySelector(".dateTime");
const bannerInput = document.querySelector("#banner");
const bannerBtn = document.querySelector(".setBanner");

const themes = document.querySelectorAll(".theme")


const dateTimeObj = {
    init: function () {
        let date = new Date()
        this.renderDay(date)
        this.renderDate(date)
        this.renderTime()
    },
    renderDay: function (date) {
        const days = [
            "Sunday", "Monday", "Tuesday",
            "Wednesday", "Thursday", "Friday", "Saturday"
        ];
        dayElement.textContent = days[date.getDay()];
    },
    renderDate: function (date) {
        let options = {
            year: "numeric",
            month: "numeric",
            day: "numeric",
        }
        let dateText = date.toLocaleString("en-GB", options).split("/").join("-");
        dateElement.textContent = dateText;
    },
    renderTime: function () {
        let options = {
            hour: "2-digit", minute: "2-digit"
        }

        const updateTime = () => {
            let date = new Date()
            let timeText = date.toLocaleTimeString("en-CA", options).toUpperCase();
            timeElement.textContent = timeText;
            if (date.getHours() === 0 && date.getMinutes() === 0) {
                this.renderDate(date);
                this.renderDay(date);
            }
        }

        updateTime();

        const delay = (60 - new Date().getSeconds()) * 1000;

        setTimeout(() => {
            updateTime();
            setInterval(updateTime, 60000)
        }, delay)
    }
}

dateTimeObj.init()

menu.addEventListener("click", function () {
    menu.classList.toggle("active")
    customPanel.classList.toggle("activeCustomPanel")
})

const customPanelObj = {
    init: function () {
        nameBtn.addEventListener("click", this.namingFunction.bind(this))
        bannerBtn.addEventListener("click", this.settingBaner.bind(this))

        for (let i = 0; i < themes.length; i++) {
            themes[i].addEventListener("click", function () {
                for (let i = 0; i < themes.length; i++) {
                    themes[i].classList.remove("activeTheme")
                }
                themes[i].classList.add("activeTheme")

                let theme = themes[i].dataset.theme

                if (theme === "light") {
                    document.documentElement.style.setProperty("--theme-primary", "#af3b15");
                    document.documentElement.style.setProperty("--theme-secondary", "#cc4c21");
                    localStorage.setItem("theme", "light")
                } else if (theme === "dark") {
                    document.documentElement.style.setProperty("--theme-primary", "#161616");
                    document.documentElement.style.setProperty("--theme-secondary", "#252525");
                    localStorage.setItem("theme", "dark")
                } else {
                    document.documentElement.style.setProperty("--theme-primary", "#0a283a");
                    document.documentElement.style.setProperty("--theme-secondary", "#0c324a");
                    localStorage.setItem("theme", "blue")
                }
                localStorage.setItem("themeIdx", i)
            })
        }
    },
    namingFunction: function () {
        let name = nameInput.value.trim()
        if (name !== "") {
            localStorage.setItem("username", name)
            nameElem.textContent = name;
        }
        nameInput.value = ""
    },
    settingBaner: function () {
        let url = bannerInput.value.trim()
        if (url !== "") {
            if (this.validUrl(url)) {
                bannerElem.style.background = `linear-gradient(#00000089, #00000085),url(${url})`;
                bannerElem.style.backgroundSize = "cover"
                bannerElem.style.backgroundPositon = "center"

                localStorage.setItem("bannerUrl", url)
            }
        }
        bannerInput.value = ""
    },
    validUrl: function (url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }
}

customPanelObj.init()

window.onload = function () {
    let username = localStorage.getItem("username")
    let url = localStorage.getItem("bannerUrl")
    let themeIdx = this.localStorage.getItem("themeIdx")
    let theme = this.localStorage.getItem("theme")

    if (username !== null) nameElem.textContent = username
    if (url != null) {
        bannerElem.style.background = `linear-gradient(#00000089, #00000085),url(${url})`;
        bannerElem.style.backgroundSize = "cover"
        bannerElem.style.backgroundPositon = "center"
    }

    if (themeIdx !== null && theme !== null) {
        for (let i = 0; i < themes.length; i++) {
            themes[i].classList.remove("activeTheme")
        }

        themes[themeIdx].classList.add("activeTheme")

        if (theme === "light") {
            document.documentElement.style.setProperty("--theme-primary", "#af3b15");
            document.documentElement.style.setProperty("--theme-secondary", "#cc4c21");
        } else if (theme === "dark") {
            document.documentElement.style.setProperty("--theme-primary", "#161616");
            document.documentElement.style.setProperty("--theme-secondary", "#252525");
        } else {
            document.documentElement.style.setProperty("--theme-primary", "#0a283a");
            document.documentElement.style.setProperty("--theme-secondary", "#0c324a");
        }
    }
}