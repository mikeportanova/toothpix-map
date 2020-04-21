<Popup
  latitude={item.latitude}
  longitude={item.longitude}
  closeButton={false}
  closeOnClick={false}
  onClose={() => this.setState({ showPopup: false })}
  anchor="top"
  tipSize={5}
  key={i}
>
  <div id={item.name} style={{ width: 10, height: 10 }} onClick={handleClick}>
    {clickedMarker[item.name] && item.post}
  </div>
</Popup>;
