declare module 'expo-image-picker' {
  export type ImagePickerResult = {
    cancelled: boolean;
    uri?: string;
    width?: number;
    height?: number;
    type?: 'image' | 'video';
    base64?: string | null;
  };

  export const MediaTypeOptions: {
    Images: string;
    Videos: string;
    All: string;
  };

  export function launchImageLibraryAsync(options?: any): Promise<ImagePickerResult>;
  export function launchCameraAsync(options?: any): Promise<ImagePickerResult>;
}
