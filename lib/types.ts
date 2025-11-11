export interface PhotoItem {
  id: string;
  name: string;
  url: string;
  size: number;
  dataUrl?: string;
}

export interface StoredPhoto {
  id: string;
  dataUrl?: string;
}

export interface AnalyzeFormData {
  profileText: string;
  notes: string;
  name: string;
  city: string;
  age: string;
  gender: string;
  platform: string;
  priorities: string[];
  stylePreference: string;
  photoDataUrl?: string;
  gallery?: StoredPhoto[];
}

export interface OutputData {
  bio: string;
  prompt_answers: string[];
  first_messages: string[];
  style_notes: string;
}

export interface ResultRecord {
  id: string;
  generatedAt: string;
  input: AnalyzeFormData;
  output: OutputData;
}
