const corpus = {
    titulus_principalis: "Génesis, 1",
    auctor: "Vulgata Latina (S. Hieronymus)",
    titulus_secundarius: {
        es: "La Creación",
        en: "The Creation",
        zh: "創造"
    },
    introductio: {
        es: {
            titulus: "Introducción al Capítulo 1",
            contentus: `<p>El primer capítulo del Génesis narra la creación del mundo en seis días. Partiendo de un estado inicial descrito como "vacío y sin forma" (<i>inanis et vacua</i>), el relato describe una secuencia ordenada de actos creativos por los cuales Dios establece el cosmos, la luz, la tierra, los seres vivos y, finalmente, al ser humano.</p>`
        },
        en: {
            titulus: "Introduction to Chapter 1",
            contentus: `<p>The first chapter of Genesis narrates the creation of the world in six days. Starting from an initial state described as "void and empty" (<i>inanis et vacua</i>), the account describes an orderly sequence of creative acts by which God establishes the cosmos, light, the earth, living beings, and finally, humankind.</p>`
        },
        zh: {
            titulus: "第 1 章簡介",
            contentus: `<p>《創世記》第一章敘述了上帝在六天內創造世界的過程。從最初被描述為「空虛混沌」（<i>inanis et vacua</i>）的狀態開始，記述了上帝一系列有序的創造行動，藉此祂建立了宇宙、光明、大地、生物，最後是人類。</p>`
        }
    },
    textus: {
        id: 1,
        capitula: [
            {
                id_capituli: 1,
                orationes: [
                    {
                        id_orationis: 'o1',
                        original_lat: "In principio creauit Deus caelum et terram.",
                        verba: [
                            { textus: "In", lemma: "in", morphologia: "Preposición", syntaxis: "Nexo (rige Ablativo)", translatio: { es: "En", en: "In", zh: "在" } },
                            { textus: "principio", lemma: "principium", morphologia: "Sust. 2ª dec, N, Abl, Sg", syntaxis: "Complemento Circunstancial de Tiempo (con 'in')", translatio: { es: "el principio", en: "the beginning", zh: "起初" } },
                            { textus: "creauit", lemma: "creo", morphologia: "Verbo, Perf. Ind. Act, 3ª Sg", syntaxis: "Verbo Principal", translatio: { es: "creó", en: "created", zh: "創造了" } },
                            { textus: "Deus", lemma: "Deus", morphologia: "Sust. 2ª dec, M, Nom, Sg", syntaxis: "Sujeto", translatio: { es: "Dios", en: "God", zh: "上帝" } },
                            { textus: "caelum", lemma: "caelum", morphologia: "Sust. 2ª dec, N, Acu, Sg", syntaxis: "Objeto Directo", translatio: { es: "el cielo", en: "the heaven", zh: "天" } },
                            { textus: "et", lemma: "et", morphologia: "Conjunción copulativa", syntaxis: "Nexo", translatio: { es: "y", en: "and", zh: "和" } },
                            { textus: "terram.", lemma: "terra", morphologia: "Sust. 1ª dec, F, Acu, Sg", syntaxis: "Objeto Directo", translatio: { es: "la tierra", en: "the earth", zh: "地" } }
                        ],
                        ordo_syntacticus: "[In principio (CCT)] [creauit (V)] [Deus (S)] [caelum (OD) et terram (OD)].",
                        translationes: {
                            es: "En el principio creó Dios el cielo y la tierra.",
                            en: "In the beginning God created the heaven and the earth.",
                            zh: "起初，上帝創造天地。"
                        }
                    }
                ]
            }
        ]
    }
};
