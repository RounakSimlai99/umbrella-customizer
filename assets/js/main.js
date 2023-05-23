document.addEventListener('DOMContentLoaded', () => {
    const umbrellaPreview = document.querySelector('.umbrella-preview');
    const umbrellaLoader = document.querySelector('.umbrella-loader');
    const logoInput = document.getElementById('logo-input');
    const colorSwitches = document.querySelectorAll('#color-switch');
    const blueButton = document.querySelector('.blue-switch')

    window.addEventListener('load', () => {
        document.body.style.backgroundColor = "#e7f6fd";
        blueButton.style.opacity = 1
        blueButton.style.border = "1px solid black"
    });

    colorSwitches.forEach(colorSwitch => {
        colorSwitch.addEventListener('click', (event) => {
            colorSwitches.forEach(colorSwitch => {
                colorSwitch.style.opacity = 0.4
                colorSwitch.style.border = "0"
            });
            const colorButton = event.target
            const selectedColor = colorButton.style.backgroundColor;
            let showColor = ""
            let umbrella = ""
            umbrellaPreview.style.visibility = "hidden"
            umbrellaLoader.style.visibility = "visible"
            if (selectedColor === "rgb(0, 163, 224)") {
                showColor = "#e7f6fd"
                umbrella = 'url("assets/images/Blue_umbrella.png")'
            }
            else if (selectedColor === "rgb(254, 209, 65)") {
                showColor = "#fef9eb"
                umbrella = 'url("assets/images/Yellow_umbrella.png")'
            }
            else if (selectedColor === "rgb(208, 1, 110)") {
                showColor = "#ffcbe7"
                umbrella = 'url("assets/images/Pink_umbrella.png")'
            }
            document.body.style.backgroundColor = showColor;
            umbrellaPreview.style.backgroundImage = umbrella
            colorButton.style.opacity = 1
            colorButton.style.border = "1px solid black"
            logoInput.style.backgroundColor = selectedColor
            setTimeout(function () {
                umbrellaPreview.style.visibility = "visible"
                umbrellaLoader.style.visibility = "hidden"
            }, 1000)
        });
    });

    logoInput.addEventListener('click', () => {
        let input = document.createElement('input');
        input.type = 'file';
        input.accept = "image/png,.jpg"
        input.onchange = () => {
            const logoFile = input.files[0];
            if (logoFile) {
                const fsize = logoFile.size
                const fileSize = Math.round((fsize / 1024));
                if (fileSize >= 5120) {
                    alert("Please Upload an image file less than 5 MB")
                    return false;
                } else {
                    umbrellaLoader.style.visibility = "visible"
                    umbrellaPreview.style.visibility = "hidden"
                    const logoURL = URL.createObjectURL(logoFile);
                    const logo = document.createElement('img');
                    logo.src = logoURL;
                    logo.classList.add('logo');

                    const existingLogo = umbrellaPreview.querySelector('.logo');
                    if (existingLogo) {
                        umbrellaPreview.removeChild(existingLogo);
                    }

                    umbrellaPreview.appendChild(logo);
                    setTimeout(function () {
                        umbrellaPreview.style.visibility = "visible"
                        umbrellaLoader.style.visibility = "hidden"
                    }, 1000)
                }
            }
        };
        input.click();
    });
});