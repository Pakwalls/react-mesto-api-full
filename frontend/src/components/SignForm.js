function SignForm({title, buttonHolder, handleChange, handleSubmit, data, children}) {
  return (
    <form className="sign-form" onSubmit={handleSubmit}>
      <h2 className="sign-form__title">{title}</h2>
      <input
        onChange={handleChange}
        value={data.email}
        type="email"
        className="input input_theme_night"
        id="email-field"
        name="email"
        placeholder="Email"
        required />
      <span className="sign-form__error" id="email-field-error"></span>
      <input
        onChange={handleChange}
        value={data.password}
        type="password"
        className="input input_theme_night"
        id="password-field"
        name="password"
        placeholder="Пароль"
        required />
      <span className="sign-form__error" id="email-field-error"></span>
      <button className="sign-form__button hover-animated">{buttonHolder}</button>
      {children}
    </form>
  );
}

export default SignForm;