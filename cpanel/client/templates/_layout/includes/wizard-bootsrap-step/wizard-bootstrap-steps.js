Template.steps_bootstrap3.helpers({
    activeStepClass: function (id) {
        var activeStep = this.wizard.activeStep();
        return (activeStep && activeStep.id == id) && 'active' || '';
    }
});
Template.steps_bootstrap3.events({
    'click a': function (e, tpl) {
        if (!this.wizard.route) {
            e.preventDefault();
            this.wizard.show(this.id);
        }
    }
});

Template.wizardButtons2.helpers({
    showBackButton: function () {
        return this.backButton && !this.isFirstStep();
    }
});

Template.wizardButtons2.events({
    'click .wizard-back-button': function (e) {
        e.preventDefault();
        this.previous(AutoForm.getFormValues(this.activeStep(false).formId).insertDoc);
    }
});
