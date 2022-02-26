import React, { useState, useCallback, useContext } from "react";
import Gallery from "react-photo-gallery";
import Photo from "../Photo";
import {arrayMoveImmutable} from "array-move";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { testPhotos } from "../testPhotos";
import {WebContext} from "../../App"

/* popout the browser and maximize to see more rows! -> */
const SortablePhoto = SortableElement((item) => <Photo {...item} />);
const SortableGallery = SortableContainer(({ items }) => (
  <Gallery
    photos={items}
    renderImage={(props) => <SortablePhoto {...props} />}
  />
));

export default function PhotoGallery(props) {
  const [items, setItems] = useState(testPhotos);

    const { webStyle } = useContext(WebContext);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setItems(arrayMoveImmutable(items, oldIndex, newIndex));
  };

    return (
        <div className="px-5 mb-3">
            <div className="  card boxShadow" style = {{backgroundColor:webStyle.darkAccent}}>
            <SortableGallery items={items} onSortEnd={onSortEnd}  axis={"xy"} />
            </div>
        </div>
      );

  
}
