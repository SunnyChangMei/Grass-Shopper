import React, {Component} from 'react'
import {connect} from 'react-redux'
import {me, displayUserInfoName} from '../store/user'
import PropTypes from 'prop-types'
import {Button, Grid, Paper, Card} from '@material-ui/core'
import {Link} from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles'

class AccountDetails extends Component {
  async componentDidMount() {
    await this.props.getUser()
  }
  render() {
    const {user, displayUserName} = this.props
    return user.id ? (
      <Paper>
        <div className="center">
          <h2>Welcome, {displayUserName}</h2>
          <Grid container spacing={2}>
            <Link to="/orders">
              <Button variant="contained" color="secondary">
                View Your Orders
              </Button>
            </Link>
            <Link to="/profile/update">
              <Button variant="contained" color="secondary">
                Update Your Profile
              </Button>
            </Link>
            <Link to="profile/resetPassword">
              <Button variant="contained" color="secondary">
                Reset Your Password
              </Button>
            </Link>
          </Grid>
          <br />
          <h1>Account Details</h1>
          <br />
          <h3>First Name:</h3> <p> {user.firstName}</p>
          <h3>Last Name:</h3> <p> {user.lastName}</p>
          <h3>Email Address:</h3> <p> {user.email}</p>
          <h3>Billing Address:</h3> <p> {user.billingAddress}</p>
          <h3>City:</h3> <p> {user.billingCity}</p>
          <h3>State:</h3> <p> {user.billingState}</p>
          <h3>Zipcode:</h3> <p> {user.billingZipcode}</p>
        </div>
      </Paper>
    ) : (
      <div>
        <h3> Loading user details...</h3>
      </div>
    )
  }
}

const mapState = state => ({
  displayUserName: displayUserInfoName(state.user.firstName, state.user.email),
  user: state.user
})

const mapDispatch = () => ({
  getUser: me
})

export default connect(mapState, mapDispatch)(AccountDetails)

AccountDetails.propTypes = {
  displayUserName: PropTypes.string
}
