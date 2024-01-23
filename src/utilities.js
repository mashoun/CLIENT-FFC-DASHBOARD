
function optimizeImageQuality(imageDataURI, quality) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            // const quality = 0.7; 
            const optimizedImageDataURI = canvas.toDataURL('image/jpeg', quality);
            resolve(optimizedImageDataURI);
        };
        img.onerror = (err) => {
            reject(err);
        };
        img.src = imageDataURI;
    });
}



function file64(path) {
    return new Promise((yes, no) => {
        try {
            const reader = new FileReader()
            reader.readAsDataURL(path)
            reader.onload = () => {
                yes(reader.result)
            }
        } catch (err) {
            no(err)
        }
    })
}

function focus(id) {
    document.getElementById(id).focus()
}


function getCurrentDate() {
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear().toString();
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');

    return `${year}${month}${day}${hours}${minutes}${seconds}`;
}


function text64(htmlString) {
    const encoder = new TextEncoder();
    const binaryData = encoder.encode(htmlString);
    const base64Data = btoa(String.fromCharCode(...new Uint8Array(binaryData.buffer)));
    return base64Data;
}

function parseHTML(id, value) { document.getElementById(id).innerHTML = value }

async function hostImages(api, images) {

    var res = await fetch(api, {
        method: "POST",
        headers: {
            "Content-Type": "text/plain",
        },
        body: JSON.stringify(images)
    })
    res = await res.json()
    return res
}

function getYouTubeId(url) {
    const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/\?v=)|youtu\.be\/)([^\s&]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

async function getYouTubeVideoDetails(videoUrl) {
    return new Promise(async (resolve, reject) => {
        const videoId = this.getYouTubeId(videoUrl);
        console.log(videoId);
        const apiKey = "AIzaSyAM6IGBPEtFrI8w62LSSlpV18LvdJtWRaE";
        const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet%2C+contentDetails`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            console.log(data);
            // const captions = data.items[0].captions;
            const title = data.items[0].snippet.title;
            const description = data.items[0].snippet.description;
            const thumbnail = data.items[0].snippet.thumbnails.default.url;

            const youtube = { title, description, thumbnail };
            // console.log(youtube)
            // return youtube;
            resolve(youtube)
        } catch (error) {
            console.error(error);
            reject(err)
        }
    })
}

function openFiles() {
    return new Promise((res, rej) => {
        try {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/png, image/jpeg, image/jpg');
            input.setAttribute('multiple', true);
            // document.appendChild(input)
            console.log(input);
            input.click();
            input.addEventListener('change', e => {
                console.log(e.target.files);
                res(e.target.files)
            })
        } catch (err) {
            console.log(err);
            rej(500)
        }
    })
}

function noQuotes(str) {
    if (str.startsWith('"') && str.endsWith('"')) {
        return str.substring(1, str.length - 1);
    }
    return str;
}

function titlePath(title) {
    return removeSpecialCharsExceptKeys(title.trim(), [' ', '-']).replaceAll(' ', '-').replace(/-+/g, '-').replaceAll('٪', '').replaceAll('؛', '').replaceAll('،', '').replaceAll('؟', '').toLowerCase()
}



function deepEqual(obj1, obj2) {
    if (obj1 === obj2) {
        return true;
    }
    if (typeof obj1 != "object" || obj1 == null ||
        typeof obj2 != "object" || obj2 == null) {
        return false;
    }
    let keys1 = Object.keys(obj1);
    let keys2 = Object.keys(obj2);
    if (keys1.length != keys2.length) {
        return false;
    }
    for (let key of keys1) {
        if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
            return false;
        }
    }
    return true;
}

function convertGoogleDriveLink(link) {

    try {
        const fileId = link.split("/")[5].split("?")[0];
        return `https://drive.google.com/uc?id=${fileId}`;
    } catch (err) {
        console.log(err);
        return link
    }
}

function checkNetwork() {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

    if (!navigator.onLine) {
        alert("Offline");
    } else if (connection && connection.effectiveType === "2g") {
        alert("Weak network");
    }
}
function getYouTubeThumbnailUrl(videoId) {
    return `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;
}

function extractTextContent(htmlString) {
    // Create a new DOM object from the HTML string
    const dom = new DOMParser().parseFromString(htmlString, 'text/html');

    // Get the text content of the document body
    const textContent = dom.body.textContent;

    // Return the text content
    return textContent;
}

function removeExtraLines(str) {
    // Replace all occurrences of more than 2 new lines with 2 new lines
    const cleanedStr = str.replace(/(\n{1,})/g, '\n\n');

    // Return the cleaned string
    return cleanedStr;
}

function removeDoubleSpaces(str) {
    // Replace all occurrences of double spaces with single spaces
    const cleanedStr = str.replace(/\s{2,}/g, ' ');

    // Return the cleaned string
    return cleanedStr;
}





function fetchTemplate(url) {
    return new Promise(async (resolve, reject) => {
        var res = await fetch(url)
        if (res.ok) {
            resolve(res.text())
        }
        reject('Template not found')
    })

}

function isEmptyObj(obj) {
    if (obj === null || obj === "") {
        return true;
    }

    if (typeof obj === "object") {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (isEmptyObj(obj[key])) {
                    return true;
                }
            }
        }
    }

    return false;
}

function filterNodes(arr, node, id) {
    return arr.filter(e => {
        return arr[node] == id
    })
}
function formatDate(dateString) {
    // Create a Date object from the input string
    const dateObject = new Date(dateString);

    // Get the components of the date
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so we add 1
    const day = dateObject.getDate().toString().padStart(2, '0');
    const hours = dateObject.getHours().toString().padStart(2, '0');
    const minutes = dateObject.getMinutes().toString().padStart(2, '0');

    // Assemble the formatted string
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

    return formattedDate;
}


export default {
    formatDate,
    filterNodes,
    fetchTemplate,
    optimizeImageQuality,
    isEmptyObj,
    removeDoubleSpaces,
    extractTextContent,
    removeExtraLines,
    getYouTubeThumbnailUrl,
    checkNetwork,
    convertGoogleDriveLink,
    file64,
    focus,
    getCurrentDate,
    parseHTML,
    hostImages,
    text64,
    getYouTubeId,
    openFiles,
    noQuotes,
    deepEqual,
    getYouTubeVideoDetails,
    titlePath
}