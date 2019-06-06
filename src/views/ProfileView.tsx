import { Button, Container, Content, Header } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { State } from 'react-native-gesture-handler';
import { NavigationScreenConfig, NavigationScreenOptions, NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ApplicationState } from '../store';
import * as CredentialsActions from '../store/reducers/credentials/actions';
import { Credentials } from '../store/reducers/credentials/types';


interface StateProps {
    credentials: Credentials,
}

interface DispatchProps {
    authenticateClear(): void,
}

interface OwnProps {
    navigation: NavigationScreenProp<State>,
}

type Props = StateProps & DispatchProps & OwnProps

class ProfileView extends Component<Props> {
    static navigationOptions: NavigationScreenConfig<NavigationScreenOptions> = {
        header: null
    };

    logout = (): void => {
        this.props.authenticateClear();
        this.props.navigation.navigate('Login');
    }

    render() {
        return (
            <Container>
                <Header />
                <Content contentContainerStyle={{ flex: 1 }}>
                    <View style={{ flex: 8 }}>
                        <Text>{this.props.credentials.name}</Text>
                    </View>
                    <View style={styles.logoutContainer}>
                        <Button rounded danger
                            style={styles.logoutBtn}
                            onPress={this.logout}
                        >
                            <Text style={styles.logoutLabel}> Logout </Text>
                        </Button>
                    </View>
                </Content>
            </ Container>
        );
    }
}

const styles = StyleSheet.create({
    logoutContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    logoutBtn: {
        alignSelf: 'center',
    },
    logoutLabel: {
        color: 'white',
        marginHorizontal: 30,
    },
});

const mapStateToProps = (state: ApplicationState) => ({
    credentials: state.credentials.data,
    loading: state.credentials.loading,
    error: state.credentials.error,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(CredentialsActions, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);