import iconSuccess from '../images/icon-success.svg';
import iconFail from '../images/icon-fail.svg';

function InfoTooltip({ onClose, isOpen, message }) {
    return (
        <div className={`popup ${isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button onClick={onClose} type="button" className="popup__icon-close"></button>
                {/* <h3 className="popup__title">{title}</h3> */}
                <div className="popup__container_align-center">
                    {/* <img className="popup__icon-info-tool-tip" src={iconFail} alt="Неуспешно"/> */}
                    <img className="popup__icon-info-tool-tip" src={message ? iconSuccess : iconFail} alt=""/>
                    {/* <h3 className="popup__title">{title}</h3> */}
                    <h3 className="popup__title">{`${message ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}`}</h3>
                    {/* <h3 className="popup__title">Вы успешно зарегистрировались!</h3> */}
                    {/* <h3 className="popup__title">Что-то пошло не так! Попробуйте еще раз.</h3> */}
                </div>
            </div>
        </div>
    )
}

export default InfoTooltip;