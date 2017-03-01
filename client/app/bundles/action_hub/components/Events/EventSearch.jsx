import React from 'react';
import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved

import _ from 'lodash';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import Zipcodes from 'zipcodes';
import * as TextFieldStyles from '../../theme/TextFieldStyles';

// TODO: Figure out the best approach for composition of styles
const zipcodeAutocompleteStyle = _.merge(TextFieldStyles.ExtraLarge, TextFieldStyles.White, TextFieldStyles.Centered);

export default class EventSearch extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      zipcode: null,
    };
  }

  zipcodeDataSource() {
    return [];
    // if (this.zipcodeDataSourceCached) {
    //   return this.zipcodeDataSourceCached;
    // }

    // const zipcodes = Object.values(Zipcodes.codes);
    // this.zipcodeDataSourceCached = zipcodes.reduce((codes, code) => {
    //   codes.push(code.zip);
    //   return codes;
    // }, []);
    // return this.zipcodeDataSourceCached;
  }


  render() {
    return (
      <section className="highlight text-center">
        <h2>Find events near you</h2>
        <p>
          Enter your ZIP code to get started.
        </p>
        <div
          style={{
            width: 180,
            display: 'inline-block',
          }}
        >
          <AutoComplete
            hintText="12345"
            fullWidth
            dataSource={this.zipcodeDataSource()}
            inputStyle={zipcodeAutocompleteStyle.inputStyle}
            hintStyle={zipcodeAutocompleteStyle.hintStyle}
            underlineStyle={zipcodeAutocompleteStyle.underlineStyle}
            underlineFocusStyle={zipcodeAutocompleteStyle.underlineFocusStyle}
            openOnFocus
          />
        </div>
        <br />
        <RaisedButton
          label={this.getSubmitButtonText()}
          primary
          disabled={!this.state.canSubmit || data.get('isSavingTopic')}
        />

      </section>
    );
  }
}
