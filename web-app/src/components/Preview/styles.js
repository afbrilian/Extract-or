const styles = {
  parserLoader: {
    width: '100%'
  },
  heading: {
    fontWeight: '600'
  },
  content: {
    '&.MuiAccordionDetails-root': {
      height: '500px',
      '& > p': {
        height: '100%',
        overflow: 'scroll'
      }
    }
  }
}

export default styles
