function generateHTML(type, data) {
    const section = document.getElementById(`${type.toLowerCase()}-section`);
    const titleText = type.charAt(0).toUpperCase() + type.slice(1);
    let htmlContent = `<h2>> ${titleText}</h2><div class="experience-section">`;
    data.forEach(item => {
        htmlContent += `
        <div class="experience">
            <div class="experience-title">
            <span class="title-text">${item.title}</span>
            <span class="title-company">${item.date}</span>
            </div>
            <div class="experience-description">
            <span class="experience-location">${item.org}</span><br>
            ${type=="Teaching" ? "<i>\""+item.description+"\"</i>" : item.description} ${item.reference ? `[<a href="${item.reference}" target="_blank">ref</a>]` : ''}
            </div>
        </div>
          `;
    });
    htmlContent += '</div>';
    section.innerHTML = htmlContent;
}

document.addEventListener("DOMContentLoaded", function () {
    for (const key in DATA) {
        generateHTML(key, DATA[key]);
    }
});
