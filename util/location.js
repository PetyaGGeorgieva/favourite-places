const GOOGLE_API_KEY = 'AIzaSyDVVfTq1sixJBhKnVoSPea0mqVKWLX0j1w';

export function getMapPreview(lat, lng) {
  if (lat === undefined || lng === undefined) {
    console.error('Invalid coordinates:', lat, lng);
    return '';
  }
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x400&key=${GOOGLE_API_KEY}`;
  console.log('Map preview URL:', imagePreviewUrl);
  return imagePreviewUrl;
}
