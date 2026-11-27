export interface CreditGroup<Photo> {
  photographerId: string;
  photos: Photo[];
}

export function groupPhotosByPhotographer<
  Photo extends { photographerId: string },
>(photos: Photo[]): CreditGroup<Photo>[] {
  const photosByPhotographer = Map.groupBy(
    photos,
    (photo) => photo.photographerId,
  );
  return [...photosByPhotographer]
    .map(([photographerId, groupPhotos]) => ({
      photographerId,
      photos: groupPhotos,
    }))
    .sort(
      (first, second) =>
        second.photos.length - first.photos.length ||
        first.photographerId.localeCompare(second.photographerId),
    );
}
