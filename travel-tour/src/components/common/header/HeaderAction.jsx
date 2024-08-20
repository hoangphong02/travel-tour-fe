import React, { memo } from 'react'

export const HeaderAction = memo(() => {
  // const { profileResponse } = useSelector((store) => store.user);
  // const { getAllNotificationsResponse } = useSelector(
  //   (store) => store.notification,
  // );

  // const cartState = localStorage.getItem(
  //   STORAGE_KEY.CART_STATE.concat('_').concat(profileResponse.data.id),
  // )
  //   ? JSON.parse(
  //     localStorage.getItem(
  //       STORAGE_KEY.CART_STATE.concat('_').concat(profileResponse.data.id),
  //     ),
  //   )
  //   : [];

  return (
    <section id="header-action" className="header-action--wrapper">
      <div className="header-action--inner flex-center-space h-full">
        <div>

            

        </div>
      </div>
    </section>
  );
});

HeaderAction.displayName = 'HeaderAction';
