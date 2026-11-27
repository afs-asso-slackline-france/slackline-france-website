import { describe, expect, it } from "vitest";
import { groupPhotosByPhotographer } from "../../src/lib/photo-credits";

describe("groupPhotosByPhotographer", () => {
  it("lists the largest contributors first, then by id", () => {
    const photos = [
      { id: "a", photographerId: "marmotte" },
      { id: "b", photographerId: "anthony-chenot" },
      { id: "c", photographerId: "anthony-chenot" },
      { id: "d", photographerId: "charles-rippon" },
    ];

    expect(groupPhotosByPhotographer(photos)).toEqual([
      { photographerId: "anthony-chenot", photos: [photos[1], photos[2]] },
      { photographerId: "charles-rippon", photos: [photos[3]] },
      { photographerId: "marmotte", photos: [photos[0]] },
    ]);
  });
});
