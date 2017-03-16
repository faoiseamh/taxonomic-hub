import dateFormat from 'dateformat';
import React from 'react';
import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton'
import * as formatConstants from '../../constants/formatConstants';

const styles = {
  eventCard: {
    margin: 10,
  },
};

export default class EventList extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      favorite: true,
    };

    this.addFavorite = this.addFavorite.bind(this);
    this.deleteFavorite = this.deleteFavorite.bind(this);
  }

  componentDidMount() {

  }

  addFavorite() {
    this.setState({favorite: true})
  }

  deleteFavorite() {
    this.setState({favorite: false})
  }

  render() {
    let favorite;

    if (this.state.favorite) {
      favorite = <FlatButton label="-Favorite" onClick={this.deleteFavorite}/>
    } else {
      favorite = <FlatButton label="+Favorite" onClick={this.addFavorite}/>
    }

    const { $$events } = this.props;
    const eventNodes = $$events.map(($$event) =>
      <Card
        key={$$event.get('id')}
        style={styles.eventCard}
      >
        <CardTitle
          title={$$event.get('title')}
          subtitle={dateFormat(Date.parse($$event.get('date')), formatConstants.verbose)}
        />
        <CardText>
          {$$event.get('body')}
        </CardText>
        <CardActions>
          {favorite}
        </CardActions>
      </Card>,
    );

    return (
      <div>
        {eventNodes}
      </div>
    );
  }
}
