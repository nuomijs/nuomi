import React, { Component }  from 'react';
import { Nuomi, useConnect } from 'nuomi';

// export class App extends Component {
//   render() {
//     <ShapeRoute routes={[{
//       path: '/',
//       async: () => import('')
//     }]} />
//   }
// }

const Container = () => {
  const [{ show }, dispatch] = useConnect();
  return <div onClick={() => {
    dispatch({
      type: 'update',
      payload: {
        show: !show
      }
    })
  }}>
    { show ? 1 : 2 }
  </div>
};

export default () => {
  return (
    <Nuomi
      state={{ show: false }}
      effects={{
        update({ dispatch, state }) {
          dispatch({
            type: '@update',
            payload: {
              show: !state.show
            }
          });
        },
      }}
      render={() => <Container />}
    />
  )
}
