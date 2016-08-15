
var data = [
 {
  "order": "1",
  "title": "Submit your Resume",
  "text": "Lorem ipsum dolor sit amet, ad utinam eirmod assueverit mei. Enim dicit pri ei, quo eu dicam dolore ignota.",
  "backtext": "Clita definitionem ex sea. Feugait denique eos id, timeam lobortis constituam at est, ex vero definitiones eam. Est minim reprimique repudiandae ea. Et est case minimum, alienum expetendis cu has."
 },
 {
  "order": "2",
  "title": "Show up to the interview on time",
  "text": "Nam denique perfecto ad. Iisque eleifend vel at, ut vis impedit suscipiantur consequuntur, populo convenire est eu. ",
  "backtext": "Aliquam dignissim vim ut. At partem deserunt has. In dico salutatus eam, novum labores tacimates est at. Definiebas assueverit te sed, ei modus movet accusam ius, usu everti democritum conclusionemque ea. Sea eirmod alienum posidonium ea. Eruditi ocurreret per ex, cum liber putant concludaturque an."
 },
 {
  "order": "3",
  "title": "Be ready to work on the whiteboard",
  "text": "Et dicta inciderint ius, et tollit alienum eum, his harum inimicus posidonium an.",
  "backtext": "At quot wisi quo. Nostro latine an sit, vitae fuisset ne vix. Ea libris patrioque conceptam usu, eu qui quis veritus consulatu. Noster appellantur vim ad, pri integre voluptua intellegebat et, vide menandri temporibus ad qui."
 },
 {
  "order": "4",
  "title": "Be yourself!",
  "text": "Apeirian disputationi at sea, ius ut commune intellegam.",
  "backtext": "Indoctum intellegat vim ad, usu ne iudico homero eligendi. An ius aperiam maiorum. Ea vocent eleifend patrioque vix, nec rebum intellegat no, eu mei libris mediocrem rationibus. Te fierent recusabo aliquando est, eam dicant audiam meliore cu."
 }];

var App = new Backbone.Marionette.Application();

var StepModel = Backbone.Model.extend({});

var StepsCollection = Backbone.Collection.extend({
  model: StepModel
});

var StepView = Backbone.Marionette.ItemView.extend({
  template: '#step-template',
  ui: {
    button: 'button'
  },
  events: {
    'click @ui.button': 'onFlipEvent',
    'mouseenter @ui.button': 'onFlipEvent',
    'mouseleave @ui.button': 'onFlipEvent'
  },
  onFlipEvent: function(event){
    var $targetCard = $(event.target).closest('.card');
    switch(event.type) {
      case "click":
        $targetCard.removeClass('peek');
        $targetCard.removeClass('peekback');
        $targetCard.toggleClass('flipped');
        break;
      case "mouseenter":
        if ($targetCard.hasClass('flipped')){
          $targetCard.addClass('peekback');
        }else{
          $targetCard.addClass('peek');
        }
        break;
      case "mouseleave":
        if ($targetCard.hasClass('flipped')){
          $targetCard.removeClass('peekback');
        }else{
          $targetCard.removeClass('peek');
        }
        break;
    }
  }
});

var NoStepView = Backbone.Marionette.ItemView.extend({
  template: '#no-step-template'
});

var StepsView = Backbone.Marionette.CollectionView.extend({
  childView: StepView,
  emptyView: NoStepView
});

App.addRegions({
  steplist: '#step-list'
});

App.addInitializer(function(){
  this.steps = new StepsCollection(data);
  this.steplist.show(new StepsView({collection: this.steps}));
});

App.start();
