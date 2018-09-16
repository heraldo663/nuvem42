import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class login extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    return (
      <div>

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = {
  loginUser
}

export default connect(mapStateToProps, mapDispatchToProps)(login)
