
export interface Artwork {
  id: string;

  title: string;

  technique: string;

  dimensions: string;

  year: number;

  status?: string;

  price?: number;

  section: "landing" | "featured" | "gallery";

  orientation?: "landscape" | "portrait" | "square";

  series?: string;

    images: {
    main: string;
    details: string[];
  }
}

export const artworks: Artwork[] = [
  {
    id: "nympheas-pour-sophie",

    title: "Nymphéas pour Sophie",

    technique: "Acrylique sur toile",

    dimensions: "80 x 40 cm",

    year: 2024,

    status: "Collection privée",

    section: "landing",

    orientation: "landscape",

    images: {
      main: "/images/hero/nympheas-pour-sophie.jpg",
      details: [],
    },
  },

  {
    id: "eclosion-cetacee",

    title: "Éclosion cétacée",

    technique: "Acrylique sur toile",

    dimensions: "72 x 115 cm",

    year: 2025,

    status: "Collection de l'artiste",

    section: "featured",

    orientation: "portrait",

    images: {
     main: "/images/grands-formats/eclosion-cetacee.jpg",

      details: [
      "/images/details/eclosion-cetacee-detail-01.jpg",
      "/images/details/eclosion-cetacee-detail-02.jpg",
      "/images/details/eclosion-cetacee-detail-03.jpg"
      ]
    }
  },

  {
    id: "eclosion-boreale",

    title: "Éclosion boréale",

    technique: "Acrylique sur toile",

    dimensions: "60 x 80 cm",

    year: 2025,

    status: "Disponible",

    price : 350,

    section: "featured",

    orientation: "portrait",

    images: {
      main: "/images/grands-formats/eclosion-boreale.jpg",
      details: [
      "/images/details/eclosion-boreale-detail-01.jpg",
      "/images/details/eclosion-boreale-detail-02.jpg",
      "/images/details/eclosion-boreale-detail-03.jpg"
      ]
    }
  },

  {
    id: "coeur-de-duc",

    title: "Coeur de duc",

    technique: "Pastel sec sur Pastelmat",

    dimensions: "23 x 23 cm",

    year: 2025,

    status: "Collection privée",

    section: "gallery",

    orientation: "square",

    series: "rapaces-nocturnes",

    images: {
      main: "/images/series/coeur-de-duc.jpg",
      details: []
    }
  },

  {
    id: "aile-grise",

    title: "Aile grise",

    technique: "Pastel sec sur Pastelmat",

    dimensions: "23 x 23 cm",

    year: 2025,

    status: "Réservé",

    section: "gallery",

    orientation: "square",

    series: "rapaces-nocturnes",

    images: {
      main: "/images/series/aile-grise.jpg",
      details: []
    }
  },

  {
    id: "plume-rayee",

    title: "Plume rayée",

    technique: "Pastel sec sur Pastelmat",

    dimensions: "23 x 23 cm",

    year: 2025,

    status: "Disponible",

    price : 120,

    section: "gallery",

    orientation: "square",

    series: "rapaces-nocturnes",

    images: {
      main: "/images/series/plume-rayee.jpg",
      details: []
    }
  },

  {
    id: "goupil-irise",

    title: "Goupil irisé",

    technique: "Pastel sec sur Pastelmat",

    dimensions: "19 x 19 cm",

    year: 2026,

    status: "Disponible",

    price : 110,

    section: "gallery",

    orientation: "square",

    series: "eclats-sylvestres",

    images: {
      main: "/images/series/goupil-irise.jpg",
      details: []
    }
  },

  {
    id: "singlar-doux",

    title: "Singlar doux",

    technique: "Pastel sec sur Pastelmat",

    dimensions: "21 x 21 cm",

    year: 2026,

    status: "Disponible",

    price : 110,

    section: "gallery",

    orientation: "square",

    series: "eclats-sylvestres",

    images: {
      main: "/images/series/singlar-doux.jpg",
      details: []
    }
  },

  {
    id: "blaui-dachs",

    title: "Blaui Dachs",

    technique: "Pastel sec sur Pastelmat",

    dimensions: "19 x 19 cm",

    year: 2026,

    status: "Disponible",

    price : 110,

    section: "gallery",

    orientation: "square",

    series: "eclats-sylvestres",

    images: {
      main: "/images/series/blaui-dachs.jpg",
      details: []
    }
  },

  {
    id: "le-blues-de-murphy",

    title: "Le Blues de Murphy",

    technique: "Acrylique sur toile",

    dimensions: "46 x 55 cm",

    year: 2024,

    status: "Disponible",

    price : 100,

    section: "gallery",

    orientation: "portrait",

    images: {
      main: "/images/galerie/le-blues-de-murphy.jpg",
      details: []
    }
  },

   {
    id: "anya",

    title: "Anya",

    technique: "Acrylique sur tissu",

    dimensions: "30 x 40 cm",

    year: 2026,

    status: "Disponible",

    price : 150,

    section: "gallery",

    orientation: "portrait",

    images: {
      main: "/images/galerie/anya.jpg",
      details: []
    }
  },

   {
    id: "promenade-givree-sur-la-sommiere",

    title: "Promenade givree sur la sommière",

    technique: "Fusain sur papier",

    dimensions: "23 x 23 cm",

    year: 2026,

    status: "Disponible",

    price : 130,

    section: "gallery",

    orientation: "square",

    images: {
      main: "/images/galerie/promenade-givree-sur-la-sommiere.jpg",
      details: []
    }
  },

   {
    id: "ciel-d-orage",

    title: "Ciel d'orage",

    technique: "Pastel sec sur Pastelmat",

    dimensions: "29 x 39 cm",

    year: 2024,

    status: "Disponible",

    price : 120,

    section: "gallery",

    orientation: "landscape",

    images: {
      main: "/images/galerie/ciel-d-orage.jpg",
      details: []
    }
  },

   {
    id: "couche-de-soleil-camarguais",

    title: "Couché de soleil Camarguais",

    technique: "Acrylique sur toile",

    dimensions: "46 x 55 cm",

    year: 2025,

    status: "Disponible",

    price : 140,

    section: "gallery",

    orientation: "portrait",

    images: {
      main: "/images/galerie/couche-de-soleil-camarguais.jpg",
      details: []
    }
  },

   {
    id: "axolotl",

    title: "Axolotl",

    technique: "Acrylique sur toile",

    dimensions: "46 x 46 cm",

    year: 2024,

    status: "Disponible",

    price : 150,

    section: "gallery",

    orientation: "square",

    images: {
      main: "/images/galerie/axolotl.jpg",
      details: []
    }
  },

];