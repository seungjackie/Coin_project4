import React, { useCallback } from "react";
import styled from "styled-components";

const St = {
    Container: styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(231, 234, 239);
  `,
    Login: styled.div`
    width: 30%;
    height: 600px;
    background: white;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `,
    Head: styled.div`
    /* color: rgb(231, 234, 239); */
    color: white;
    font-size: 3em;
    font-weight: bolder;
    text-shadow: 1px 2px 3px black;
  `,
    Login_sns: styled.div`
    padding: 20px;
    display: flex;
  `,
    Login_id: styled.div`
    margin-top: 20px;
    width: 80%;
  `,
    Input: styled.input`
    width: 100%;
    height: 50px;
    border-radius: 30px;
    margin-top: 10px;
    padding: 0px 20px;
    border: 1px solid lightgray;
    outline: none;
  `,
    Login_pw: styled.div`
    margin-top: 20px;
    width: 80%;
  `,
    Login_etc: styled.div`
    padding: 10px;
    width: 80%;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
   `,
    Submit: styled.div`
    margin-top: 50px;
    width: 80%;
   `,
    Submit_input: styled.input`
    width: 100%;
    height: 50px;
    border: 0;
    outline: none;
    border-radius: 40px;
    background: linear-gradient(to right, rgb(231, 234, 239), #f7b5c9);
    color: white;
    font-size: 1.2em;
    letter-spacing: 2px;
    cursor:pointer;
    &:hover {
        background: linear-gradient(to right, #f7b5c9, #f7b5c9);
        color: white;
    }
    `,

    ToJoin: styled.a`
    margin: auto;
    text-decoration-line: none;
    text-decoration-line: none;
    `,
    
};

const LoginForm = () => {
  return (
    <St.Container>
        <St.Login>
            <St.Head>Log-in</St.Head>
            <St.Login_sns>
            {/* <li><a href=""><i class="fab fa-instagram"></i></a></li>
            <li><a href=""><i class="fab fa-facebook-f"></i></a></li>
            <li><a href=""><i class="fab fa-twitter"></i></a></li> */}
            </St.Login_sns>
            <St.Login_id>
                <h4>E-mail</h4>
                <St.Input type="email" name="" id="" placeholder="Email" />
            </St.Login_id>
            <St.Login_pw>
                <h4>Password</h4>
                <St.Input type="password" name="" id="" placeholder="Password" />
            </St.Login_pw>
            <St.Login_etc>
                {/* <div>
                    <input  type="checkbox" name="" id=""> Remember Me? </input>
                </div> */}
                <St.ToJoin href="/join">아직 회원이 아니신가요?</St.ToJoin>
            </St.Login_etc>
            <St.Submit>
                <St.Submit_input type="submit" value="submit"></St.Submit_input>
            </St.Submit>
        </St.Login>
    </St.Container>
  )
}

export default LoginForm;
