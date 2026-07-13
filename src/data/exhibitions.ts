export interface Exhibition {

    year: number;

    title: string;

    location: string;

    dates: string;

    featured?: boolean;

}

export const exhibitions: Exhibition[] = [

        {
            year: 2026,

            title: "Salon des Arts Pontevallois",

            location: "Pont-de-Vaux",

            dates: "19 juillet au 16 août",

            featured: true
        },

        {
            year: 2025,

            title: "Salon des Arts Pontevallois",

            location: "Pont-de-Vaux",

            dates: "20 juillet au 17 août",

        },

        {
            year: 2024,

            title: "Salon des Arts Pontevallois",

            location: "Pont-de-Vaux",

            dates: "21 juillet au 18 août",

        },

];