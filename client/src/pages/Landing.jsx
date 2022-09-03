import styled from "styled-components";

import main from "../assets/images/main.svg";
import Wrapper from "../assets/style/LandingPage";
import Logo from "../components/Logo";

const Landing = () => {
	return (
		<Wrapper>
			<nav>
				<Logo />
			</nav>
			<div className="container page">
				<div className="info">
					<h1>
						Job <span>Tracking</span> App
					</h1>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. A, in
						laudantium. Quis illum dolore dicta veniam quibusdam, corporis
						dignissimos harum fuga iusto quod eveniet fugit vero soluta ab?
						Tempore atque rerum quidem? Explicabo, ipsum unde quibusdam eveniet
						commodi eligendi accusamus ad delectus nostrum soluta maxime minus
						voluptatibus? Enim, qui error.
					</p>
					<button className="btn btn-hero">Login/Register</button>
				</div>
				<img src={main} alt="mainhero" className="img main-img" />
			</div>
		</Wrapper>
	);
};
export default Landing;
