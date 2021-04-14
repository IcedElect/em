const Section = ({id, title, children}) => (
    <section className="section" id={id}>
        <div className="section__container container">
            {title && <div className="section__header">
                <div className="section__header-title">{title}</div>
            </div>}
            <div className="section__inner">
                {children}
            </div>
        </div>
    </section>
)

export default Section;