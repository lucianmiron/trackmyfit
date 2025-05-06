export interface Activity {
  id: number;
  name: string;
  duration: number;
  startDate: string;
  exercises: {
    name: string;
    sets: {
      reps: number;
      weight: number;
      unit: 'kg' | 'lb';
      duration: number;
    }[];
  }[];
}
