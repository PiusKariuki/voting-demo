import {
	Button,
	Card,
	CardHeader,
	CardBody,
	FormGroup,
	Form,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Col,
	Spinner,
} from "reactstrap";
import useLogin from "../hooks/useLogin";

const Login = () => {
	const { email, password, handleChange, load, login, formError } = useLogin();
	return (
		<>
			<Col lg="5" md="7">
				<Card className="bg-secondary shadow border-0">
					<CardHeader className="bg-transparent pb-5">
						<div className="text-muted text-center mt-2 mb-3">
							<small>Sign in </small>
						</div>
					</CardHeader>
					<CardBody className="px-lg-5 py-lg-5">
						<Form role="form" onSubmit={login}>
							<FormGroup className="mb-3">
								<InputGroup className="input-group-alternative">
									<InputGroupAddon addonType="prepend">
										<InputGroupText>
											<i className="ni ni-email-83" />
										</InputGroupText>
									</InputGroupAddon>
									<Input
										id="email"
										value={email}
										onChange={handleChange}
										placeholder="Email"
										type="email"
										autoComplete="new-email"
									/>
								</InputGroup>
							</FormGroup>
							<FormGroup>
								<InputGroup className="input-group-alternative">
									<InputGroupAddon addonType="prepend">
										<InputGroupText>
											<i className="ni ni-lock-circle-open" />
										</InputGroupText>
									</InputGroupAddon>
									<Input
										id="pass"
										value={password}
										onChange={handleChange}
										placeholder="Password"
										type="password"
										autoComplete="new-password"
									/>
								</InputGroup>
							</FormGroup>
							<div className="custom-control custom-control-alternative custom-checkbox">
								<input
									className="custom-control-input"
									id=" customCheckLogin"
									type="checkbox"
								/>
							</div>
							<p className="text-danger">{formError}</p>
							<div className="text-center">
								{load ? (
									<Spinner color="primary" type="grow">
										Loading......
									</Spinner>
								) : (
									<Button
										onClick={login}
										className="my-4"
										color="primary"
										type="button">
										Sign in
									</Button>
								)}
							</div>
						</Form>
					</CardBody>
				</Card>
			</Col>
		</>
	);
};

export default Login;
