document.addEventListener('DOMContentLoaded', () => {
    // 1. VERIFICACIÓN INICIAL
    if (typeof corpus === 'undefined') {
        console.error("Error: El objeto 'corpus' no está definido. Asegúrate de que tu archivo de datos (ej: datos_capitulo1.js) se está cargando correctamente y antes que 'logica.js'.");
        return;
    }

    // 2. REFERENCIAS A ELEMENTOS DEL DOM
    const mainTitleElem = document.getElementById('main-title');
    const subtitleElem = document.getElementById('subtitle');
    const authorElem = document.getElementById('author');
    const contextTitleElem = document.getElementById('context-title');
    const contextContentElem = document.getElementById('context-content');
    const textTitleElem = document.getElementById('text-title');
    const paragrafusContentusElem = document.getElementById('paragrafus-contentus');
    const marginaliaContentusElem = document.getElementById('marginalia-contentus');
    const footerElem = document.getElementById('footer-text');
    const langSwitcher = document.getElementById('language-switcher');
    
    let currentLang = 'es';

    // =========================================================================================
    // === FUNCIONES DE RENDERIZADO ===
    // =========================================================================================

    function renderContent() {
        mainTitleElem.textContent = corpus.titulus_principalis;
        subtitleElem.textContent = corpus.titulus_secundarius[currentLang];
        authorElem.textContent = corpus.auctor;
        
        contextTitleElem.textContent = corpus.introductio[currentLang].titulus;
        contextContentElem.innerHTML = corpus.introductio[currentLang].contentus;
        
        textTitleElem.textContent = currentLang === 'es' ? 'Texto y Análisis' : (currentLang === 'en' ? 'Text and Analysis' : '文本與分析');
        
        buildLatinText();
        
        footerElem.textContent = `© ${new Date().getFullYear()} - Análisis Interactivo.`;
    }

    function buildLatinText() {
        paragrafusContentusElem.innerHTML = ''; 

        corpus.textus.capitula.forEach((capitulum, capitulumIndex) => {
            const p = document.createElement('p');
            p.className = "mb-6";

            capitulum.orationes.forEach((oratio, oratioIndex) => {
                const words = oratio.original_lat.split(/(\s+)/);

                words.forEach(word => {
                    if (!word.trim()) {
                        p.appendChild(document.createTextNode(word));
                        return;
                    }
                    
                    const cleanWord = word.replace(/[,.;:]/g, '');
                    const verbumData = oratio.verba.find(v => v.textus.replace(/[,.;:]/g, '') === cleanWord);

                    if (verbumData) {
                        const span = document.createElement('span');
                        span.textContent = word;
                        span.className = 'verbum';
                        span.dataset.capitulumIndex = capitulumIndex;
                        span.dataset.oratioIndex = oratioIndex;
                        span.dataset.verbumTextus = verbumData.textus;
                        p.appendChild(span);
                    } else {
                        p.appendChild(document.createTextNode(word));
                    }
                });
            });
            paragrafusContentusElem.appendChild(p);
        });
    }

    /**
     * Muestra el análisis de una palabra en la barra lateral.
     * NUEVA VERSIÓN: Ahora incluye la traducción de la palabra.
     * @param {HTMLElement} clickedSpan - El elemento <span> de la palabra que fue clickeada.
     */
    function showAnalysis(clickedSpan) {
        const { capitulumIndex, oratioIndex, verbumTextus } = clickedSpan.dataset;
        const oratioData = corpus.textus.capitula[capitulumIndex].orationes[oratioIndex];
        const verbumData = oratioData.verba.find(v => v.textus.replace(/[,.;:]/g, '') === verbumTextus.replace(/[,.;:]/g, ''));

        if (!verbumData) return;

        // **NUEVA LÍNEA**: Obtenemos la traducción de la palabra en el idioma actual
        const palabraTraducida = verbumData.translatio ? verbumData.translatio[currentLang] : 'N/A';

        marginaliaContentusElem.innerHTML = `
            <div class="space-y-4">
                <div>
                    <p class="text-2xl textum-classicum text-gray-800 font-bold">${verbumData.textus}</p>
                    
                    <p class="text-lg text-blue-600 font-semibold mb-2">${palabraTraducida}</p> 

                    <p class="text-sm text-gray-600"><b>Lema:</b> <i>${verbumData.lemma}</i></p>
                    <p class="text-sm text-gray-600"><b>Morfología:</b> ${verbumData.morphologia}</p>
                    <p class="text-sm text-gray-600"><b>Sintaxis:</b> ${verbumData.syntaxis}</p>
                </div>
                <hr>
                <details open>
                    <summary class="font-semibold text-gray-700">Traducción de la Oración</summary>
                    <div class="details-content mt-2 text-sm text-gray-700">
                        <p>${oratioData.translationes[currentLang]}</p>
                    </div>
                </details>
                ${oratioData.ordo_syntacticus ? `
                <details>
                    <summary class="font-semibold text-gray-700">Orden Sintáctico</summary>
                    <div class="details-content mt-2 text-sm text-gray-700">
                        <code>${oratioData.ordo_syntacticus}</code>
                    </div>
                </details>` : ''}
                ${oratioData.notae ? `<p class="mt-4 text-xs italic text-gray-500"><b>Nota:</b> ${oratioData.notae}</p>` : ''}
            </div>
        `;
    }

    // =========================================================================================
    // === MANEJADORES DE EVENTOS ===
    // =========================================================================================
    
    paragrafusContentusElem.addEventListener('click', (e) => {
        if (e.target.classList.contains('verbum')) {
            document.querySelectorAll('.verbum').forEach(el => el.classList.remove('activus'));
            e.target.classList.add('activus');
            showAnalysis(e.target);
        }
    });

    langSwitcher.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const newLang = e.target.dataset.lang;
            if (newLang !== currentLang) {
                currentLang = newLang;
                langSwitcher.querySelectorAll('.lang-btn').forEach(btn => {
                    btn.classList.toggle('active-lang', btn.dataset.lang === newLang);
                });
                renderContent();
                marginaliaContentusElem.innerHTML = '';
            }
        }
    });

    // =========================================================================================
    // === INICIALIZACIÓN ===
    // =========================================================================================
    renderContent();
});
