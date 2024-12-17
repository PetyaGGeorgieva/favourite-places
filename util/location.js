import { EXPO_PUBLIC_GOOGLE_API_KEY } from '@env';

export function getMapPreview(lat, lng) {
  if (lat === undefined || lng === undefined) {
    console.error('Invalid coordinates:', lat, lng);
    return '';
  }
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x400&key=${EXPO_PUBLIC_GOOGLE_API_KEY}`;
  return imagePreviewUrl;
}

