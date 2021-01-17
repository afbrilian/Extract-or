import React, { Component } from 'react'
import { connect } from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Alert from '@material-ui/lab/Alert'

import Uploader from './components/Uploader'
import Preview from './components/Preview'
import { signInAnonymously } from './redux/auth'

import styles from './App.styles'

class App extends Component {
  state = {
    alert: {
      show: false,
      severity: '',
      message: ''
    }
  }

  componentDidMount() {
    this.props.signInAnonymously()
  }

  componentDidUpdate() {
    if (this.props.auth.error) {
      this.showAlert('error', 'Cannot fire up session!')
    }
  }

  showAlert = (severity, message) => {
    this.setState({ alert: { show: true, severity, message } })
    setTimeout(() => {
      this.setState({ alert: { show: false, severity: '', message: '' } })
    }, 1500)
  }

  render() {
    const { classes } = this.props
    return (
      <div className="App">
        <AppBar position="sticky" className={classes.header}>
          <Toolbar className={classes.toolbar}>
            <Typography variant="h6" className={classes.title}>
              Extractify
            </Typography>
          </Toolbar>
        </AppBar>
        <Container>
          <Box mt={2}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="stretch"
              spacing={2}
            >
              <Grid item xs={12}>
                <Uploader showAlert={this.showAlert} />
              </Grid>
              <Grid item xs={12}>
                <Preview />
              </Grid>
            </Grid>
          </Box>
          {this.state.alert.show && (
            <Alert
              className={classes.alertBox}
              severity={this.state.alert.severity}
            >
              {this.state.alert.message}
            </Alert>
          )}
        </Container>
      </div>
    )
  }
}

export default connect((state) => ({ auth: state.auth }), {
  signInAnonymously
})(withStyles(styles)(App))
