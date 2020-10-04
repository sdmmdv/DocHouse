// import React, { Component } from 'react';

// class UserProfile extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {  }
//     }
//     render() { 
//         return (
//             <p>I am in User profile!</p>
//         );
//     }
// }
 
// export default UserProfile;
import React, { Component } from 'react';
import { Grid, Cell, Icon, FontIcon } from 'react-mdl';
import '../App.css';
// import Education from './education';
// import Experience from './experience';
// import Skills from './skills';


class UserProfile extends Component {
  render() {
    return(
      <div>
        <Grid>
          <Cell col={8}>
            <div style={{textAlign: 'center'}}>
              <img className="container-div"
                src="https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png"
                alt="avatar"
                style={{height: '200px', margin: 'auto'}}
                 />
            </div>
            <div>
                <h2 style={{paddingTop: '2em'}}>Name Surname</h2>
                <h5>Bio <Icon name="web"/></h5>
                <hr style={{borderTop: '3px solid #833fb2', width: '50%'}}/>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                        the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
                        type and scrambled it to make a type specimen book. It has survived not only five centuries, but
                        also the leap into electronic typesetting, remaining essentially unchanged.</p>
                <hr style={{borderTop: '3px solid #833fb2', width: '20%'}}/>
                <h5>Phone <Icon name="phone"/></h5>
                    <p>+99 4569033</p>
                <hr style={{borderTop: '3px solid #833fb2', width: '20%'}}/>
                <h5>Email <Icon name="email"/></h5>
                    <p>someone@example.com</p>
                <hr style={{borderTop: '3px solid #833fb2', width: '20%'}}/>
                <h5>Address <Icon name="map"/></h5>
                    <p>1 Hacker Way Menlo Park, 94025</p>
                <hr style={{borderTop: '3px solid #833fb2', width: '20%'}}/>
                <h5>Web <Icon name="explorer"/></h5>
                    <p>somewebsite.com</p>
            </div>
          </Cell>
          {/* <Cell className="button_placeholder" col={8}>
          </Cell> */}
        </Grid>
      </div>
    )
  }
}

export default UserProfile;