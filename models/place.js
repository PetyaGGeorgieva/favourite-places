class Place {
  constructor(title, imageUri, address, location) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = location // { lat: 12.34, lng: 56.78 }
    this.id = new Date().toString() + Math.random().toString();
  }
}

