import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { State } from 'react-native-gesture-handler';
import { NavigationScreenConfig, NavigationScreenOptions, NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ILogin } from '../models/ILogin';
import { ApplicationState } from '../store';
import * as CredentialsActions from '../store/reducers/credentials/actions';
import { Credentials } from '../store/reducers/credentials/types';

interface StateProps {
    credentials: Credentials,
}

interface DispatchProps {
    authenticateRequest(data: ILogin): void,
}

interface OwnProps {
    navigation: NavigationScreenProp<State>;
}

type Props = StateProps & DispatchProps & OwnProps

class LoginView extends Component<Props> {
    static navigationOptions: NavigationScreenConfig<NavigationScreenOptions> = {
        header: null
    };

    componentDidMount() {
        console.log(this.props.credentials);
        this.props.authenticateRequest({
            email: 'jose.couves@proenem.com.br',
            password: '12347',
        });
    }

    componentDidUpdate() {
        console.log(this.props.credentials);
    }

    render() {
        const { credentials } = this.props;
        return (
            <View>
                <Text>Login</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')}>
                    <Text>Navigatie To Profile =></Text>
                    <Text>{credentials.name}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

const mapStateToProps = (state: ApplicationState) => ({
    credentials: state.credentials.data,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(CredentialsActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);