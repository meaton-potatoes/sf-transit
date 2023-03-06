const STOP_FAVORITES_STORAGE_KEY = "stop_favorites";

class LocalStorageHelper {
  static fetchValue(key) {
    try {
      const json = localStorage.getItem(key);
      if (!json) {
        return {};
      }
      return JSON.parse(json);
    } catch (error) {
      console.error("fetchValue errors", error);
      return {};
    }
  }

  static setValue(key, value) {
    localStorage.setItem(key, value);
  }

  static fetchFavoriteStops() {
    return this.fetchValue(STOP_FAVORITES_STORAGE_KEY);
  }

  static setFavoriteStop(stopId, isFavorite) {
    let newFavorites = this.fetchFavoriteStops();
    if (isFavorite) {
      newFavorites = { ...newFavorites, [stopId]: true };
    } else {
      delete newFavorites[stopId];
    }
    this.setValue(STOP_FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites));
    return newFavorites;
  }
}

export default LocalStorageHelper;
