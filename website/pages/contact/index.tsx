import Form from "../../components/form/form"
import Label from "../../components/label"

const Contact = () => {
    return <div className="grid place-items-center space-y-16">
        <div id="contact" className="pt-12">
            <Label text={"Contact"} />
        </div>
        <div data-aos="fade-up" data-aos-offset="200">
            <Form props={{}} />
        </div>
    </div>
}

export default Contact