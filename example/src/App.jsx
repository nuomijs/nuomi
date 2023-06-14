import React, { Fragment, Component }  from 'react';
import { ShapeRoute, configure, router, NavLink, Nuomi } from 'nuomi';
import { Router } from 'nuomi';

configure({
  reload: true,
})

router.listener(() => {
  NProgress.start();
}, () => {
  NProgress.done();
})

const App = 1;

class A extends Component {
  render() {
    return <>1111</>
  }
}

console.log(typeof A)

export default () => {
  return <Nuomi render={A}></Nuomi>
}

// import React  from 'react';
// import { Nuomi } from 'nuomi';
// import list from './list';
// import List from './List.jsx';

// export default () => (
//   <Nuomi {...list}>
//     <List />
//   </Nuomi>
// )
