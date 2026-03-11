export type Category = 
  | 'Las 5 Grandes Ligas'
  | 'Playeras Firmadas'
  | 'Playeras de Selecciones'
  | 'Playeras Más Recientes';

export interface Jersey {
  id: string;
  team: string;
  season: string;
  description?: string;
  imageUrl: string;
  category: Category;
}

export const INITIAL_JERSEYS: Jersey[] = [
  {
    id: '1',
    team: 'Real Madrid',
    season: '2023/24',
    description: 'Camiseta local con detalles dorados, celebrando la grandeza del club.',
    imageUrl: 'https://images.unsplash.com/photo-1552318414-a951307b2f64?q=80&w=800&auto=format&fit=crop',
    category: 'Las 5 Grandes Ligas'
  },
  {
    id: '2',
    team: 'Arsenal',
    season: '2003/04',
    description: 'La mítica camiseta de los Invencibles. Un clásico de la Premier League.',
    imageUrl: 'https://images.unsplash.com/photo-1600181516264-3ea807ff44b9?q=80&w=800&auto=format&fit=crop',
    category: 'Las 5 Grandes Ligas'
  },
  {
    id: '3',
    team: 'Argentina',
    season: '2022',
    description: 'Edición Campeones del Mundo con las 3 estrellas. Firmada por Lionel Messi.',
    imageUrl: 'https://images.unsplash.com/photo-1614632537190-23e4146777db?q=80&w=800&auto=format&fit=crop',
    category: 'Playeras Firmadas'
  },
  {
    id: '4',
    team: 'Brasil',
    season: '1970',
    description: 'Réplica exacta de la camiseta usada por Pelé en el Mundial del 70. Autografiada.',
    imageUrl: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=800&auto=format&fit=crop',
    category: 'Playeras Firmadas'
  },
  {
    id: '5',
    team: 'Francia',
    season: '2024',
    description: 'Nueva equipación local con el gallo gigante clásico.',
    imageUrl: 'https://images.unsplash.com/photo-1518605368461-1e12801e80b4?q=80&w=800&auto=format&fit=crop',
    category: 'Playeras de Selecciones'
  },
  {
    id: '6',
    team: 'Japón',
    season: '2024',
    description: 'Diseño especial inspirado en el arte tradicional japonés y el origami.',
    imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800&auto=format&fit=crop',
    category: 'Playeras de Selecciones'
  },
  {
    id: '7',
    team: 'Bayer Leverkusen',
    season: '2024/25',
    description: 'Camiseta de los campeones invictos de la Bundesliga. Edición especial.',
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop',
    category: 'Playeras Más Recientes'
  },
  {
    id: '8',
    team: 'Inter Miami',
    season: '2024/25',
    description: 'Tercera equipación estilo retro vintage con colores vibrantes.',
    imageUrl: 'https://images.unsplash.com/photo-1580087433276-8df14f243026?q=80&w=800&auto=format&fit=crop',
    category: 'Playeras Más Recientes'
  }
];
