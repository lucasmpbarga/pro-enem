import { Button, Container, Content, Form, Header, Input, Item, Label, Text } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationScreenConfig, NavigationScreenOptions, NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ILogin } from '../models/ILogin';
import { ApplicationState } from '../store';
import * as CredentialsActions from '../store/reducers/credentials/actions';
import { Credentials } from '../store/reducers/credentials/types';

interface StateProps {
    credentials: Credentials,
    error: boolean,
}

interface DispatchProps {
    authenticateRequest(data: ILogin): void,
    authenticateClear(): void,
}

interface OwnProps {
    navigation: NavigationScreenProp<State>,
}

type Props = StateProps & DispatchProps & OwnProps

interface State {
    login: ILogin,
    validateEmail: boolean,
    canSubmit: boolean,

}

class LoginView extends Component<Props, State> {
    static navigationOptions: NavigationScreenConfig<NavigationScreenOptions> = {
        header: null
    };

    constructor(props: Props) {
        super(props);
        this.state = {
            login: {
                email: 'jose.couves@proenem.com.br',
                password: '12347',
            },
            validateEmail: true,
            canSubmit: true,
        }
    }

    componentDidMount() {
        if (!this.existCredentialsNavigateProfile()) {
            this.props.authenticateClear();
        }
    }

    componentDidUpdate() {
        this.existCredentialsNavigateProfile()
    }

    existCredentialsNavigateProfile = (): boolean => {
        const existCrendetials = !!this.props.credentials.id;
        if (existCrendetials) {
            this.props.navigation.navigate('Profile');
        }
        return existCrendetials;
    }

    onEmailChangeHandle = (value: string): void => {
        let regValidationEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let validateEmail = regValidationEmail.test(value);
        let canSubmit: boolean = !!(value && this.state.login.password && validateEmail);

        this.setState({
            login: { ...this.state.login, email: value },
            canSubmit,
            validateEmail
        });
    }

    onPasswordChangeHandle = (value: string): void => {
        let formStatus: boolean = !!(value && this.state.login.email);
        this.setState({
            login: { ...this.state.login, password: value },
            canSubmit: formStatus
        });
    }

    logIn = (): void => {
        this.props.authenticateRequest(this.state.login);
    }

    render() {
        const { validateEmail, canSubmit } = this.state;
        const { email, password } = this.state.login;
        const { error } = this.props;
        return (
            <Container>
                <Header />
                <Text style={styles.loginLabel}>ProENEM</Text>
                <Content>
                    <Form>
                        <Item fixedLabel>
                            <Label>E-mail:</Label>
                            <Input
                                value={email}
                                onChangeText={this.onEmailChangeHandle}
                                style={validateEmail ? { color: 'black' } : { color: 'red' }}
                            />
                        </Item>
                        <Item fixedLabel last>
                            <Label>Password:</Label>
                            <Input
                                secureTextEntry={true}
                                value={password}
                                onChangeText={this.onPasswordChangeHandle}
                            />
                        </Item>
                        <Button rounded primary
                            style={styles.submit}
                            onPress={this.logIn}
                            disabled={!canSubmit}
                        >
                            <Text> Submit </Text>
                        </Button>
                        {
                            error &&
                            <Text style={styles.errorLabel}>E-mail ou Senha inválidos.</Text>
                        }
                    </Form>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    loginLabel: {
        fontSize: 50,
        textAlign: 'center',
        margin: 10,
        color: '#202072'
    },
    errorLabel: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: 'red'
    },
    submit: {
        alignSelf: 'center',
        marginTop: 16,
    }
});

const mapStateToProps = (state: ApplicationState) => ({
    credentials: state.credentials.data,
    loading: state.credentials.loading,
    error: state.credentials.error,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(CredentialsActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);