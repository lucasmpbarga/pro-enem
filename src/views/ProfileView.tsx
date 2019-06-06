import { Button, Container, Content, Header } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { State } from 'react-native-gesture-handler';
import { NavigationScreenConfig, NavigationScreenOptions, NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ApplicationState } from '../store';
import * as CredentialsActions from '../store/reducers/credentials/actions';
import * as PersonActions from '../store/reducers/person/actions';
import { Person } from '../store/reducers/person/types';



interface StateProps {
    credentialId: number,
    person: Person,
    loading: boolean,
    error: boolean,
}

interface DispatchProps {
    authenticateClear(): void,
    personRequest(personId: number): void,
}

interface OwnProps {
    navigation: NavigationScreenProp<State>,
}

type Props = StateProps & DispatchProps & OwnProps

class ProfileView extends Component<Props> {
    static navigationOptions: NavigationScreenConfig<NavigationScreenOptions> = {
        header: null
    };

    componentDidMount() {
        this.props.personRequest(this.props.credentialId);
    }

    logout = (): void => {
        this.props.authenticateClear();
        this.props.navigation.navigate('Login');
    }

    render() {
        const { name } = this.props.person;
        const { loading } = this.props;
        return (
            <Container>
                <Header />
                <Content contentContainerStyle={{ flex: 1 }}>
                    {
                        loading &&
                        <View style={{ flex: 8, alignItems: 'center' }}>
                            <Text>Loading...</Text>
                        </View>
                    }
                    {
                        !loading &&
                        <View style={{ flex: 8 }}>
                            {
                                name && !loading &&
                                <Text>{name}</Text>
                            }
                        </View>
                    }
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
    credentialId: state.credentials.data.id,
    person: state.person.data,
    loading: state.person.loading,
    error: state.person.error,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators({ ...CredentialsActions, ...PersonActions }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);