<template>
  <home-layout>
    <div :class="{'landing-page': true,'show-mobile-menu': showMobileMenu}">
      <div class="mobile-menu" @click="$event.stopPropagation()">
        <a  href="/">

          <img class="rounded" alt="null" src="./../../assets/payCoinPng.png"
              width="100" height="100" />
            <!-- <span><strong> Pay Coins</strong> </span> -->
        </a>
        <ul class="navbar-nav">
         <!-- <li class="nav-item">
            <a  href="/docs">Developers</a>
          </li> -->
          <li class="nav-item">
            <a  href="#">Blog</a>
          </li>
          <li class="nav-item">
            <a  href="/faqs">FAQ</a>
          </li>
          <!-- <li class="nav-item">
            <a  href="/integrate">Integration</a>
          </li> -->
          <li class="nav-item">
            <div class="separator"></div>
          </li>
          <li class="nav-item pl-4">
            <i class="fas fa-user-plus"></i>
            <router-link to="/user/register">Register</router-link>
          </li>
          <li class="nav-item pl-4">
            <i class="fas fa-sign-in-alt"></i>
            <router-link to="/user/login">login</router-link>
          </li>
        </ul>
      </div>

      <div class="main-container">
        <div class="landing-page-nav">
          <headroom style="height:initial;">
            <nav>
              <div class="container d-flex align-items-center justify-content-between">
                <a class="text-primary pull-left text-bold"  href="/">

                  <img src="./../../assets/payCoinPng.png" class="rounded" width="40" height="40" /> Pay Coins
                  <!--
                  <span class="white"></span>
                  <span class="dark"></span>
                  <strong class="white">PayCoin</strong>
                  -->
                </a>
                <ul class="navbar-nav d-none d-lg-flex flex-row">
                  <!-- <li class="nav-item">
                    <a  href="/docs">Developers</a>
                  </li> -->
                  <li class="nav-item">
                    <a  href="#">Blog</a>
                  </li>
                  <li class="nav-item">
                    <a  href="/faqs">FAQ</a>
                  </li>
                  <!-- <li class="nav-item">
                    <a  href="/integrate">Integration</a>
                  </li> -->
                  <li class="nav-item pl-4">
                    <i class="fas fa-user-plus"></i>
                    <router-link to="/user/register">Register</router-link>
                  </li>
                  <li class="nav-item pl-4">
                    <i class="fas fa-sign-in-alt"></i>
                    <router-link to="/user/login">login</router-link>
                  </li>
                </ul>
                <span
                  class="mobile-menu-button"
                  @click="showMobileMenu=!showMobileMenu; $event.stopPropagation()"
                >
                  <i class="simple-icon-menu"></i>
                </span>
              </div>
            </nav>
          </headroom>
        </div>

        <div class="content-container" id="home">

          <div class="section home" id="sectionHome">
            <div class="container">

              <div class="row home-row" id="homeRow">
                <div class="col-12 col-md-6 mb-5">
                  <div class="home-text">
                   <div class="d-flex justify-content-center d-md-block">
                      <div>
                        <div class="">
                          <h1 class="d-block py-0 my-0 text-white"><strong> Accept </strong></h1>
                          <h1 class="d-block py-0 my-0 text white"><strong> Bitcoin </strong></h1>
                          <h1 class="d-block py-0 my-0 text-white"><strong>& Other Cryptocurrencies Instantly.</strong></h1>
                        </div>
                        <div class="white mt-5 mb-5">
                          <p> <i class="fas fa-check mr-2"></i> <strong>Fast — </strong>Go live in minutes, (No Silly Forms & Questions)</p>

                          <p> <i class="fas fa-check mr-2" /> <strong>Free — </strong>  No fees to accept crypto</p>

                          <p> <i class="fas fa-check mr-2" /> <strong>Convert — </strong>  Sell your crypto for cash or Other Coins</p>

                          <p> <i class="fas fa-check mr-2" /> <strong>Accept Price — </strong> Stable cryptocurrency</p>

                          <p> <i class="fas fa-check mr-2" /> <strong>Global — </strong> Sell Worldwide and go Big</p>

                          <p> <i class="fas fa-check mr-2" /> <strong>No Middlemen — </strong> Be your own Bank</p>

                          <p> <i class="fas fa-check mr-2" /> <strong>Irreversible — </strong> Chargebacks are a thing of the past</p>

                        </div>
                        <div>
                          <b-form @submit.prevent="gotoSignUp">
                            <b-input-group class="shadow" size="lg">
                              <b-input v-model="email" required  placeholder="Your email" size="lg" class="py-4" />
                              <b-form-invalid-feedback :force-show="isInvalid" >
                                Enter a valid email
                              </b-form-invalid-feedback>
                              <b-button type="submit" squared>Get Started</b-button>
                            </b-input-group>
                          </b-form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-12 col-md-6 mt-5">
                 <div class="row">
                    <div class="col-2 col-md-3"></div>
                    <div class="col-8 col-md-9">
                      <div class="d-flex justify-content-center">
                        <img class="shadow-sm" style="border-radius: 12px" width="280"  alt="payment-anination" src="./../../assets/anipay.gif"/>
                      </div>
                    </div>
                 </div>
                </div>
              </div>
            </div>
          </div>

          <div class="container mb-5" style="margin-top: 100px">
            <div class="mb-5">
              <div class="d-flex justify-content-center">
                  <h1> <strong>Integrated With</strong></h1>
              </div>
              <div class="d-column d-md-flex">
                <div class="flex-fill d-flex justify-content-center mb-4 mb-md-0">
                  <img  src="./../../assets/commerce.svg" />
                </div>
                <div class="flex-fill d-flex justify-content-center">
                  <img src="./../../assets/shop.svg" />
                </div>
              </div>
            </div>
          </div>
        </div>

          <div class="container mt-5" >
            <div class="row">
              <div class="col-12 col-md-2 col-lg-3"></div>

              <div class="col-12 col-md-8 col-lg-6">
                <div >
                  <!-- First sit image part -->
                  <div class="mb-5">
                    <b-card @mouseenter="shover($event)"  @mouseleave="clover()" id="fast" :class="` shadow-sm ${currentHover == 'fast'? 'shadow': ''}`">
                      <div class="d-flex justify-content-center">
                        <!-- <img class="d-none d-md-block"  src="./../../assets/sit.svg" />
                        <img class="d-block d-md-none" width="250" src="./../../assets/sit.svg" /> fighter-jet-->
                        <i class="fas fa-digital-tachograph text-primary" style="font-size: 100px" />
                      </div>
                      <div class="mt-3">
                        <h2 class="text-center"><strong>Up and running in minutes</strong></h2>
                        <p class="text-center">
                          We'll have you set up with hosted checkout pages, payment buttons,
                          invoicing, and multiple ecommerce integrations
                        </p>
                      </div>
                    </b-card>
                  </div>

                  <!-- Top sit image part -->
                  <div class="mt-5 mb-5">
                    <b-card @mouseenter="shover($event)"  @mouseleave="clover()" id="free" :class="` shadow-sm ${currentHover == 'free'? 'shadow': ''}`">
                      <div class="d-flex justify-content-center">
                        <!--<img class="d-none d-md-block"  src="./../../assets/topsit.svg" />
                        <img class="d-block d-md-none" width="250" src="./../../assets/topsit.svg" /> -->
                            <i class="fas fa-comments-dollar text-primary" style="font-size:100px"></i>

                      </div>
                      <div class="mt-5">
                        <h2 class="text-center"><strong>Free</strong></h2>
                        <p class="text-center">
                          No fees to accept crypto
                        </p>
                      </div>
                    </b-card>
                  </div>

                  <!-- Right stand image part -->
                  <div class="mt-5 mb-5">
                    <b-card @mouseenter="shover($event)"  @mouseleave="clover()" id="control" :class="` shadow-sm ${currentHover == 'control'? 'shadow': ''}`">
                     <div class="d-flex justify-content-center">
                            <div>
                            <i class="fas fa-gamepad text-primary" style="font-size:100px"></i>

                      <!-- <img class="d-none d-md-block"  src="./../../assets/stand.svg" />
                      <img class="d-block d-md-none" width="250" src="./../../assets/stand.svg" /> -->
                            </div>

                    </div>
                    <div class="mt-3">
                      <h2 class="text-center"><strong>Stay in control</strong></h2>
                      <p class="text-center">
                        We don't hold your crypto. You do. We give you all the benefits
                        of a hosted platform while you maintain ownership.
                      </p>
                    </div>
                    </b-card>
                  </div>

                  <!-- Left stand image part -->
                  <div class="mt-5 mb-5">
                    <b-card @mouseenter="shover($event)"  @mouseleave="clover()" id="secure" :class="` shadow-sm ${currentHover == 'secure'? 'shadow': ''}`">
                      <div class="d-flex justify-content-center">
                        <!-- <img class="d-none d-md-block"  src="./../../assets/standleft.svg" />
                        <img class="d-block d-md-none" width="250" src="./../../assets/standleft.svg" /> -->
                        <i class="fas fa-user-shield text-primary" style=" font-size: 100px" />
                      </div>
                      <div class="mt-5">
                        <h2 class="text-center"><strong>Secure and trusted</strong></h2>
                        <p class="text-center">
                          As the world's leading cryptocurrency company, security
                          is always our number one priority.
                        </p>
                      </div>
                    </b-card>
                  </div>

                  <!-- Left stand image part -->
                  <div class="mt-5 mb-5">
                    <b-card @mouseenter="shover($event)"  @mouseleave="clover()" id="convert" :class="` shadow-sm ${currentHover == 'convert'? 'shadow': ''}`">
                      <div class="d-flex justify-content-center">
                        <!-- <img class="d-none d-md-block"  src="./../../assets/standleft.svg" />
                        <img class="d-block d-md-none" width="250" src="./../../assets/standleft.svg" /> -->
                        <i class="fas fa-coins text-primary" style=" font-size: 100px" />
                      </div>
                      <div class="mt-5">
                        <h2 class="text-center"><strong>Conversion</strong></h2>
                        <p class="text-center">
                          You can easily convert your crypto wallet to other crypto currencies with the
                          gem of real time rate.
                        </p>
                      </div>
                    </b-card>
                  </div>

                  <div class="mt-5 mb-5">
                    <h2 class="text-center mb-3">
                      <strong>
                        Join the first open financial system for the world
                      </strong>
                    </h2>
                    <p class="text-center">
                      Receive payments from anyone in the world.
                    </p>
                </div>


                </div>
              </div>

              <div class="col-12 col-md-2 col-lg-3">
              </div>
            </div>
          </div>

          <div class="mt-5">
            <iframe frameborder="0"  class="w-100" style="height:400px" src="https://commerce.coinbase.com/map">
            </iframe>

          </div>

          <div class="mt-5 container">
              <b-card>
                <div class="d-column d-md-flex mb-3">
                    <div class="d-none border-right d-md-block flex-fill">
                      <p class="mb-2"> <i class="fas fa-check mr-3" />Invoicing</p>
                      <p class="mb-2"> <i class="fas fa-check mr-3" />Multi-currency</p>
                      <p class="mb-2"> <i class="fas fa-check mr-3" />No limits</p>
                      <p class="mb-2"> <i class="fas fa-check mr-3" />Conversions to fiat or stablecoin</p>
                      <p class="mb-2"> <i class="fas fa-check mr-3" />Robust API</p>
                      <p class="mb-2"> <i class="fas fa-check mr-3" />Webhooks for charges</p>
                      <p class="mb-2"> <i class="fas fa-check mr-3" />Customized payment buttons</p>
                      <p class="mb-2"> <i class="fas fa-check mr-3" />Hosted checkout pages</p>
                      <p class="mb-2"> <i class="fas fa-check mr-3" />Get Started</p>
                      <p class="mb-2"> <i class="fas fa-check mr-3" />The signup process will take ~4 minutes</p>
                    </div>
                    <div class="ml-md-2 flex-fill align-self-center">
                      <h2><strong>Get Started</strong></h2>
                      <p>The signup process will take ~4 minutes</p>
                      <b-form @submit.prevent="gotoSignUp">
                            <b-input-group class="shadow" size="lg">
                              <b-input v-model="email" required  placeholder="Your email" size="lg" class="py-4" />
                              <b-form-invalid-feedback :force-show="isInvalid" >
                                Enter a valid email
                              </b-form-invalid-feedback>
                              <b-button type="submit" squared>Get Started</b-button>
                            </b-input-group>
                          </b-form>
                    </div>
                </div>

              </b-card>
          </div>


          <!-- section footer mb-0 -->
          <div class="mb-0" id="sectionFooter">
            <div class="tester bg-primary">
              <div class="container">
                <div class="row footer-row">
                  <div class="col-12 text-right">
                    <div
                      class="mt-2 btn btn-circle btn-outline-semi-light "
                      @click="toTop"
                    >
                      <i  class=" simple-icon-arrow-up"></i>
                    </div>
                  </div>
                  <div class="col-12 text-center footer-content">
                    <a  href="/">

                      <img class="rounded" alt="footer logo" src="./../../assets/payCoinPng.png"
                        width="40" height="40" />
                      <span><strong> Pay Coins</strong> </span>
                    </a>
                  </div>
                </div>
              </div>
              <div class="container  copyright pt-5 pb-5">
                <div class="row">
                  <div class="col-12"></div>
                  <div class="col-12 text-center">
                    <p class="mb-0">{{ fullYear }} © Pay Coins </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

      </div>
    </div>
  </home-layout>
</template>

<script>
import { headroom } from "vue-headroom";
import VueScrollTo from "vue-scrollto";
import HomeLayout from "../../layouts/HomeLayout";
import GlideComponent from "../../components/Carousel/GlideComponent";
import { adminRoot, buyUrl } from "../../constants/config";
import { TEMP_MAIL } from '../../constants/formKey';
const slideSettings = {
  type: "carousel",
  gap: 30,
  perView: 4,
  hideNav: true,
  peek: { before: 10, after: 10 },
  breakpoints: {
    "600": { perView: 1 },
    "992": { perView: 2 },
    "1200": { perView: 3 }
  }
};

const scrollOptions = {
  container: "body",
  easing: "ease-in",
  offset: -120,
  force: true,
  x: false,
  y: true
};

export default {
  components: {
    "home-layout": HomeLayout,
    "glide-component": GlideComponent,
    headroom: headroom
  },
  data() {
    return {
      showMobileMenu: false,
      blocky: true,
      adminRoot,
      buyUrl,
      slideSettings,
      coinColor: "white",
      currentHover:"",
      email:"",
      isInvalid: false,

    };
  },
  methods: {
    toTop(){
      // alert()
      document.getElementById('home').scrollIntoView();
    },

    gotoSignUp(){
      this.isInvalid = false;
      if(!/^\w+\.*\w+@\w+\.\w+$/.test(this.email)){
        this.isInvalid = true;
        return
      }

      this.$store.commit(TEMP_MAIL, this.email);
      this.$router.push("/user/register");
    },

    shover(e){
      if( e.target.id){
        this.currentHover = e.target.id;

      }else{
        this.currentHover = "";
      }
    },

    clover(){
      this.currentHover = "";
    },
    BLOCKY(){
      if(window.innerWidth < 931){
        this.blocky = true;
      }else{
        this.blocky = false;
      }
      console.log(window.innerWidth);
    },

    onWindowResize() {
      const homeRect = document
        .getElementById("homeRow")
        .getBoundingClientRect();
      const homeSection = document.getElementById("sectionHome");
      homeSection.style.backgroundPositionX = homeRect.x - 580 + "px";
      // this.BLOCKY();
      // const footerSection = document.getElementById("sectionFooter");
      // footerSection.style.backgroundPositionX =
        // event.target.innerWidth - homeRect.x - 500 + "px";

      if (event.target.innerWidth >= 992) {
        this.showMobileMenu = false;
      }
    },

    onWindowScroll() {
      this.showMobileMenu = false;
    },
    onWindowClick() {
      this.showMobileMenu = false;
    },

    scrollTo(target) {
      VueScrollTo.scrollTo(target, 200, scrollOptions);
    }
  },
  mounted() {
    document.body.classList.add("no-footer");
    window.addEventListener("scroll", this.onWindowScroll);
    window.addEventListener("resize", this.onWindowResize);
    window.addEventListener("click", this.onWindowClick);
    // this.onWindowResize();
  },
  beforeDestroy() {
    document.body.classList.remove("no-footer");
    window.removeEventListener("scroll", this.onWindowScroll);
    window.removeEventListener("resize", this.onWindowResize);
    window.removeEventListener("click", this.onWindowClick);
  },

  created(){
    // this.BLOCKY();
  },

  computed:{
    fullYear(){
      let date = new Date();
      return date.getFullYear();
    }
  }
};
</script>

<style lang="scss" >
 .tester{
   margin-top: 6em;
   padding-top: 6em;
   width: 100%;
   border-top-right-radius: 6em;
   box-shadow: 0px 0px 8px rgb(116, 112, 112);
   clip-path: polygon(0 50%, 95% 0, 100% 10%, 100% 100%, 0 100%);
 }

</style>
