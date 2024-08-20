import React, { memo } from 'react'

export const FooterAction = memo(() => {
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
    <section id="footer-action" className="footer-action--wrapper">
      <div className="footer-action--inner flex-center-space h-full">
       
      </div>
    </section>
  );
});

FooterAction.displayName = 'FooterAction';
