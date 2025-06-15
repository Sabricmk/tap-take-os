
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from 'next/image';
import {
  ShoppingCart, Clock, Play, Pause, RotateCcw, Brain, BarChart3,
  ShoppingBag, Sparkles, Activity, Database, Shield, Signal, Search, Bell, User, Users as UsersIcon,
  Command, RefreshCw, Smartphone, Briefcase, Gift, DollarSign, TrendingUp, MapPin, ListChecks, Palette, Target, Filter, Zap, PieChart, FileText, Server, AlertTriangle, CheckCircle2, HelpCircle, TrendingDown, Minus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

import type { Customer, CartItem, Product, StoreArea, AIRecommendation, ShoppingStep, CustomerHistory, CustomerHistoryEntry, RegionData, StoreLocationData, SalesData, CategorySales, CustomerSegment, NPSDataEntry, CSATDataEntry, CampaignData, ChannelPerformance, FinancialMetric, ProfitMarginData, RegionalMarketAnalysis, ABTestingResult, SeasonalityTrend, StoreComparison, MarketingLoyaltyData, MarketingPersonalizedOffersData, MarketingSocialMediaData, OmnichannelClickCollectData, OmnichannelEcommerceData, OmnichannelUnifiedJourneyData, OmnichannelMobileAppData, OmnichannelInventorySyncData, OmnichannelSocialCommerceData, FinancialCashflowData, FinancialPaymentMethodsData, FinancialReturnsData, ConversionMetricsData, AbbruchAnalyseData, AlgorithmusPerformanceData, LiveTrainingStatusData, PushPerformanceData, CustomerDemographicsData, RelationshipInsightData, CustomerSegmentsData as CustomerSegmentsDataType } from "@/lib/types";
import {
    products as allProductsData,
    shoppingScenarios,
    initialCustomers as rawInitialCustomers,
    storeAreas as initialStoreAreasFromConstants,
    customerHistory,
    salesByStoreAreaData,
    topSellingProductsData,
    regionalPerformanceData,
    topPerformerStoresData,
    bottomPerformerStoresData,
    revenueOverviewData,
    profitMarginByCategoryData,
    regionalMarketAnalysisData,
    abTestingResultsData,
    seasonalityTrendsData,
    storeComparisonData,
    marketingLoyaltyData,
    marketingPersonalizedOffersData,
    marketingSocialMediaData,
    omnichannelClickCollectData,
    omnichannelEcommerceData,
    omnichannelUnifiedJourneyData,
    omnichannelMobileAppData,
    omnichannelInventorySyncData,
    omnichannelSocialCommerceData,
    financialCashflowData,
    financialPaymentMethodsData,
    financialReturnsData,
    conversionMetricsData,
    abbruchAnalyseData,
    algorithmusPerformanceData,
    liveTrainingStatusData,
    pushPerformanceData,
    customerDemographicsData,
    relationshipInsightData,
    customerSegmentsData
} from "@/lib/constants";
import { generateProductRecommendations, type GenerateProductRecommendationsInput, type GenerateProductRecommendationsOutput } from '@/ai/flows/generate-product-recommendations';

import TechLoadingSpinner from "@/components/shared/TechLoadingSpinner";
import ParticleCanvas from "@/components/shared/ParticleCanvas";
import NavItem from "@/components/shared/NavItem";
import MetricCard from "@/components/shared/MetricCard";


const getCustomerColorClass = (colorName: string | undefined, type: 'border' | 'bg' | 'text' = 'border'): string => {
  const colorMap: Record<string, Record<string, string>> = {
    emerald: { border: 'border-emerald-500/50', bg: 'bg-emerald-500', text: 'text-emerald-400' },
    blue: { border: 'border-blue-500/50', bg: 'bg-blue-500', text: 'text-blue-400' },
    purple: { border: 'border-purple-500/50', bg: 'bg-purple-500', text: 'text-purple-400' },
    orange: { border: 'border-orange-500/50', bg: 'bg-orange-500', text: 'text-orange-400' },
    pink: { border: 'border-pink-500/50', bg: 'bg-pink-500', text: 'text-pink-400' },
    cyan: { border: 'border-cyan-500/50', bg: 'bg-cyan-500', text: 'text-cyan-400' },
    green: { border: 'border-green-500/50', bg: 'bg-green-500', text: 'text-green-400' },
    amber: { border: 'border-amber-500/50', bg: 'bg-amber-500', text: 'text-amber-400' },
    default: { border: 'border-slate-500/50', bg: 'bg-primary', text: 'text-slate-400' },
  };
  const selectedType = colorMap[colorName || 'default']?.[type] || colorMap['default'][type];

  if (type === 'bg' && colorName && colorMap[colorName]) {
      return colorMap[colorName].bg;
  }
  return selectedType;
};

const progressColorMap: Record<string, string> = {
    emerald: '[&>div]:bg-emerald-500',
    blue: '[&>div]:bg-blue-500',
    purple: '[&>div]:bg-purple-500',
    orange: '[&>div]:bg-orange-500',
    pink: '[&>div]:bg-pink-500',
    cyan: '[&>div]:bg-cyan-500',
    green: '[&>div]:bg-green-500',
    amber: '[&>div]:bg-amber-500',
    default: '[&>div]:bg-primary',
};

const RECOMMENDATION_THROTTLE_MS = 60000;

export default function TapTakeLiveSimulation() {
  const [customers, setCustomers] = useState<Customer[]>(() => JSON.parse(JSON.stringify(rawInitialCustomers)));
  const [storeAreas, setStoreAreas] = useState<StoreArea[]>(initialStoreAreasFromConstants);
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [recentActivity, setRecentActivity] = useState<string[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<string>(rawInitialCustomers[0].id);
  const [simulationSpeed, setSimulationSpeed] = useState<number>(3000);
  const [activeTab, setActiveTab] = useState<string>("map");
  const [isLoading, setIsLoading] = useState(true);

  const [systemStatus, setSystemStatus] = useState(85);
  const [aiStatus, setAiStatus] = useState(92);
  const [networkStatus, setNetworkStatus] = useState(78);
  const [activeNavItem, setActiveNavItem] = useState<string>("dashboard");

  const [totalTaps, setTotalTaps] = useState(0);
  const [recommendationsByCustomerId, setRecommendationsByCustomerId] = useState<Record<string, AIRecommendation[]>>({});
  const [totalTappedItemsPurchased, setTotalTappedItemsPurchased] = useState(0);
  const [lastRecommendationRequestTimeByCustomerId, setLastRecommendationRequestTimeByCustomerId] = useState<Record<string, number>>({});


  const prevCustomersRef = useRef<Customer[]>(customers);


  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStatus(Math.floor(Math.random() * 10) + 80);
      setAiStatus(Math.floor(Math.random() * 15) + 80);
      setNetworkStatus(Math.floor(Math.random() * 20) + 70);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const generateLocalRecommendations = useCallback((cart: CartItem[]): AIRecommendation[] => {
    if (cart.length === 0) return []
    const localRecs: AIRecommendation[] = []
    const cartProductIds = new Set(cart.map((item) => item.id))

    if (cart.some((item) => item.category === "Nudeln") && !cartProductIds.has("13")) {
      const product = allProductsData.find(p => p.id === "13");
      if (product) localRecs.push({ product, reason: "Passt gut zu Pasta (lokal)", confidence: 80 });
    }
    if (cart.some((item) => item.category === "Frühstück") && !cartProductIds.has("22")) {
       const product = allProductsData.find(p => p.id === "22");
      if (product) localRecs.push({ product, reason: "Perfekt zum Frühstück (lokal)", confidence: 75 });
    }
    return localRecs.slice(0, 2);
  }, []);


  const triggerGenerateRecommendations = useCallback(async (customer: Customer, cartItemsFromUser: CartItem[]) => {
    if (customer.isAnonymous) return;

    const now = Date.now();
    const lastRequestTime = lastRecommendationRequestTimeByCustomerId[customer.id] || 0;

    if (now - lastRequestTime < RECOMMENDATION_THROTTLE_MS) {
      return;
    }

    if (!cartItemsFromUser || cartItemsFromUser.length === 0) {
      setRecommendationsByCustomerId(prev => ({ ...prev, [customer.id]: [] }));
      return;
    }

    setLastRecommendationRequestTimeByCustomerId(prev => ({ ...prev, [customer.id]: now }));

    try {
      const cartSummary = cartItemsFromUser.map(item => item.name + " (Qty: " + item.quantity + ")").join(', ');
      const lastItem = cartItemsFromUser.length > 0 ? cartItemsFromUser[cartItemsFromUser.length - 1] : null;
      const lastItemName = lastItem?.name || 'N/A';
      const lastItemCategory = lastItem?.category || 'various items';

      const behaviorString = "Customer " + customer.name + " is actively shopping. Current cart (" + cartItemsFromUser.length + " items): " + cartSummary + ". Last added item was " + lastItemName + ". Possible interest in " + lastItemCategory + ".";

      let customerProfileInfoString = '';
      const currentCustomerHistory = customerHistory[customer.id as keyof typeof customerHistory];
      if (currentCustomerHistory) {
        const favCats = currentCustomerHistory.favoriteCategories.map(c => c.name).join(', ');
        const patterns = currentCustomerHistory.patterns.join('. ');
        customerProfileInfoString = `Previously liked categories: ${favCats}. Observed shopping patterns: ${patterns}`;
      }

      const input: GenerateProductRecommendationsInput = {
        cart: cartItemsFromUser.map(item => ({
          ...item,
          image: item.image || '',
          timestamp: item.timestamp,
        })),
        shoppingBehavior: behaviorString,
        customerProfileInfo: customerProfileInfoString || undefined,
      };
      const recommendationsOutput = await generateProductRecommendations(input);

      const finalRecommendations = recommendationsOutput.map(rec => {
        let processedImage = '🛍️'; 
        const aiImage = rec.product.image; 

        if (aiImage) { 
          const trimmedImage = aiImage.trim();
          if (trimmedImage.startsWith('http')) {
            processedImage = trimmedImage;
          } else if (trimmedImage.length > 0 && trimmedImage.length <= 4 && !trimmedImage.includes('.') && !trimmedImage.includes('/') && !trimmedImage.includes(' ')) {
            processedImage = trimmedImage;
          }
        }
        
        return {
          ...rec,
          product: {
            ...rec.product,
            image: processedImage,
          },
        };
      });
      setRecommendationsByCustomerId(prev => ({ ...prev, [customer.id]: finalRecommendations }));
    } catch (error) {
      console.error("Error generating recommendations for customer " + customer.id + ":", error);
      const localRecs = generateLocalRecommendations(cartItemsFromUser);
      setRecommendationsByCustomerId(prev => ({ ...prev, [customer.id]: localRecs }));
    }
  }, [generateLocalRecommendations, lastRecommendationRequestTimeByCustomerId]);


  useEffect(() => {
    let simIntervalId: NodeJS.Timeout | null = null;

    if (isSimulationRunning) {
      simIntervalId = setInterval(() => {
        setCustomers((prevCustomersList) => {
          let allCustomersFinishedShopping = true;
          const updatedCustomers = prevCustomersList.map((customer) => {
            if (!customer.isActive) {
              return customer;
            }
            allCustomersFinishedShopping = false;

            let { currentStep, scenario, cart: customerCart, ticksSpentInCurrentStep = 0, timeToCompleteCurrentStep = 1 } = customer;

            ticksSpentInCurrentStep++;

            if (ticksSpentInCurrentStep < timeToCompleteCurrentStep) {
              return { ...customer, ticksSpentInCurrentStep };
            }

            ticksSpentInCurrentStep = 0;
            const completedStepDetails = scenario[currentStep];
            let newAisle = customer.currentAisle;
            let newAction = customer.currentAction;


            if (completedStepDetails.productId && completedStepDetails.productId !== "") {
              const productToAdd = allProductsData.find((p) => p.id === completedStepDetails.productId);
              if (productToAdd) {
                const existingItemIndex = customerCart.findIndex((item) => item.id === productToAdd.id);
                const itemToAddDetails: CartItem = {
                    ...productToAdd,
                    quantity: 1,
                    timestamp: new Date().toISOString()
                };

                if (!customer.isAnonymous) {
                    itemToAddDetails.addMethod = 'tap';
                }

                if (existingItemIndex > -1) {
                  customerCart[existingItemIndex] = {
                      ...customerCart[existingItemIndex],
                      quantity: customerCart[existingItemIndex].quantity + 1,
                      timestamp: new Date().toISOString()
                    };
                     if (!customer.isAnonymous) {
                        customerCart[existingItemIndex].addMethod = 'tap';
                    }
                } else {
                  customerCart.push(itemToAddDetails);
                }

                if (!customer.isAnonymous) {
                    const productInAllData = allProductsData.find(p => p.id === productToAdd.id);
                    if (productInAllData) {
                        productInAllData.tapCount = (productInAllData.tapCount || 0) + 1;
                    }

                    const areaToUpdate = storeAreas.find(a => a.name === completedStepDetails.aisle);
                    if (areaToUpdate) {
                      areaToUpdate.nfcTaps = (areaToUpdate.nfcTaps || 0) + 1;
                      setStoreAreas(prevAreas => prevAreas.map(a => a.id === areaToUpdate.id ? areaToUpdate : a));
                    }

                    setTotalTaps((prev) => prev + 1);
                    setRecentActivity((prev) => [`${customer.avatar} ${customer.name}: ${productToAdd.name} in ${completedStepDetails.aisle}`, ...prev.slice(0, 9)]);
                }
              }
            } else if (completedStepDetails.aisle === "Kasse") {
              const totalAmount = customerCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
              setRecentActivity((prev) => [`${customer.avatar} ${customer.name}: Bezahlt €${totalAmount.toFixed(2)} an der Kasse 💳`, ...prev.slice(0, 9)]);

              let tappedAndPurchasedCount = 0;
              customerCart.forEach(item => {
                if (item.addMethod === 'tap' && !item.isRecommendation) {
                  tappedAndPurchasedCount++;
                }
              });
              setTotalTappedItemsPurchased(prev => prev + tappedAndPurchasedCount);
            }

            const currentRecommendationsForCustomer = recommendationsByCustomerId[customer.id] || [];
            if (!customer.isAnonymous && currentRecommendationsForCustomer.length > 0 && Math.random() < 0.2) {
                const randomRec = currentRecommendationsForCustomer[Math.floor(Math.random() * currentRecommendationsForCustomer.length)];
                if (randomRec && randomRec.product && !customerCart.find(item => item.id === randomRec.product.id)) {
                    customerCart.push({ ...randomRec.product, quantity: 1, timestamp: new Date().toISOString(), isRecommendation: true, addMethod: 'tap' });
                    setTotalTaps((prev) => prev + 1);

                    const productInMainList = allProductsData.find(p => p.id === randomRec.product.id);
                    if (productInMainList) {
                        productInMainList.tapCount = (productInMainList.tapCount || 0) + 1;
                    }

                    const areaToUpdate = storeAreas.find(a => a.name === completedStepDetails.aisle);
                    if (areaToUpdate) {
                        areaToUpdate.nfcTaps = (areaToUpdate.nfcTaps || 0) + 1;
                        setStoreAreas(prevAreas => prevAreas.map(a => a.id === areaToUpdate.id ? areaToUpdate : a));
                    }
                    setRecentActivity(prev => [`${customer.avatar} ${customer.name}: ✨ KI-Empfehlung: ${randomRec.product.name} hinzugefügt`, ...prev.slice(0, 9)]);
                }
            }

            currentStep++;
            const progress = (currentStep / scenario.length) * 100;

            if (currentStep >= scenario.length) {
              return {
                ...customer,
                cart: [...customerCart],
                currentAisle: "Verlassen",
                currentAction: "Einkauf abgeschlossen! 🎉",
                progress: 100,
                isActive: false,
                currentStep,
              };
            }

            const nextStepDetails = scenario[currentStep];
            newAisle = nextStepDetails.aisle;
            newAction = nextStepDetails.action;
            let baseDuration = nextStepDetails.duration || 1;
            timeToCompleteCurrentStep = baseDuration + Math.floor(Math.random() * 3);
            if (timeToCompleteCurrentStep <= 0) timeToCompleteCurrentStep = 1;


            return {
                ...customer,
                currentAisle: newAisle,
                currentAction: newAction,
                progress,
                cart: [...customerCart],
                currentStep,
                ticksSpentInCurrentStep,
                timeToCompleteCurrentStep
            };
          });

          if (allCustomersFinishedShopping && updatedCustomers.every(c => !c.isActive)) {
            setIsSimulationRunning(false);
            setRecentActivity((prev) => ["🎉 Simulation abgeschlossen! Alle Kunden haben eingekauft.", ...prev.slice(0, 9)]);
          }
          return updatedCustomers;
        });
      }, simulationSpeed);
    }

    return () => {
      if (simIntervalId) clearInterval(simIntervalId);
    };
  }, [isSimulationRunning, simulationSpeed, recommendationsByCustomerId, storeAreas]);


  useEffect(() => {
    if (!isSimulationRunning) {
      prevCustomersRef.current = customers;
      return;
    }

    customers.forEach((currentCustomer) => {
      if (currentCustomer.isAnonymous) return;

      const prevCustomer = prevCustomersRef.current.find(pc => pc.id === currentCustomer.id);

      if (!currentCustomer.isActive || currentCustomer.cart.length === 0) {
        return;
      }

      let cartChangedSignificantly = false;
      const userAddedItems = currentCustomer.cart.filter(item => !item.isRecommendation);

      if (!prevCustomer) {
        cartChangedSignificantly = userAddedItems.length > 0;
      } else {
        const prevUserAddedItems = prevCustomer.cart.filter(item => !item.isRecommendation);
        if (userAddedItems.length !== prevUserAddedItems.length) {
          cartChangedSignificantly = true;
        } else {
          const currentUserItemSignature = userAddedItems.map(i => i.id + "-" + i.quantity).sort().join(',');
          const prevUserItemSignature = prevUserAddedItems.map(i => i.id + "-" + i.quantity).sort().join(',');
          if (currentUserItemSignature !== prevUserItemSignature) {
            cartChangedSignificantly = true;
          }
        }
      }

      if (cartChangedSignificantly && userAddedItems.length > 0 && !currentCustomer.isAnonymous) {
        triggerGenerateRecommendations(currentCustomer, userAddedItems);
      }
    });

    prevCustomersRef.current = JSON.parse(JSON.stringify(customers));
  }, [customers, isSimulationRunning, triggerGenerateRecommendations]);


  const startSimulation = () => {
    allProductsData.forEach(p => p.tapCount = 0);
    const resetStoreAreas = initialStoreAreasFromConstants.map(area => ({ ...area, nfcTaps: 0 }));
    setStoreAreas(resetStoreAreas);

    setCustomers(prev => prev.map(c => {
        const customerPrototype = rawInitialCustomers.find(ic => ic.id === c.id) || rawInitialCustomers[0];
        const initialScenario = shoppingScenarios[Math.floor(Math.random() * shoppingScenarios.length)];
        const firstStep = initialScenario[0];

        let initialDuration = firstStep?.duration || 1;
        const randomizedInitialDuration = initialDuration + Math.floor(Math.random() * 3);

        return {
            ...JSON.parse(JSON.stringify(customerPrototype)),
            isActive: true,
            currentStep: 0,
            progress: 0,
            cart: [],
            scenario: initialScenario,
            currentAisle: firstStep?.aisle || "Eingang",
            currentAction: firstStep?.action || "Startet Einkauf",
            ticksSpentInCurrentStep: 0,
            timeToCompleteCurrentStep: randomizedInitialDuration > 0 ? randomizedInitialDuration : 1,
            isAnonymous: customerPrototype.isAnonymous || false,
        };
    }));
    setRecommendationsByCustomerId({});
    setLastRecommendationRequestTimeByCustomerId({});
    setIsSimulationRunning(true);
    setTotalTaps(0);
    setTotalTappedItemsPurchased(0);
    setRecentActivity(["🚀 Simulation gestartet! Kunden beginnen mit dem Einkaufen."]);
  };

  const stopSimulation = () => {
    setIsSimulationRunning(false);
    setRecentActivity((prev) => ["⏸️ Simulation pausiert.", ...prev.slice(0, 9)]);
  };

  const resetSimulation = () => {
    stopSimulation();
    allProductsData.forEach(p => p.tapCount = 0);
    const resetStoreAreas = initialStoreAreasFromConstants.map(area => ({ ...area, nfcTaps: 0 }));
    setStoreAreas(resetStoreAreas);
    setCustomers(JSON.parse(JSON.stringify(rawInitialCustomers)));
    setRecommendationsByCustomerId({});
    setLastRecommendationRequestTimeByCustomerId({});
    setRecentActivity([]);
    setTotalTaps(0);
    setTotalTappedItemsPurchased(0);
    setSelectedCustomer(rawInitialCustomers[0].id);
    setActiveNavItem("dashboard");
    setActiveTab("map");
  };

  const selectedCustomerData = customers.find((c) => c.id === selectedCustomer) || customers[0];
  const selectedCustomerRecommendations = recommendationsByCustomerId[selectedCustomerData.id] || [];

  const getActiveCustomers = () => customers.filter((c) => c.isActive && c.currentAisle !== "Verlassen");
  const getTotalItems = () => customers.reduce((total, customer) => total + customer.cart.reduce((sum, item) => sum + item.quantity, 0), 0);
  const getTotalSpent = () => {
    const totalSpentVal = customers.reduce(
      (total, customer) => total + customer.cart.reduce((sum, item) => sum + item.price * item.quantity, 0),0
    );
    return totalSpentVal;
  };
  const getAverageSpentPerActiveCustomer = () => {
    const activeCust = getActiveCustomers();
    if (activeCust.length === 0) return 0;
    const totalSpentByActive = activeCust.reduce(
      (total, customer) => total + customer.cart.reduce((sum, item) => sum + item.price * item.quantity, 0),0
    );
    return totalSpentByActive / activeCust.length;
  };


  const getCustomerPosition = (aisle: string, customerIndex: number) => {
    const area = storeAreas.find((a) => a.name === aisle);
    if (!area) return { x: 5, y: 5 };

    const customersInSameAisle = customers.filter(c => c.isActive && c.currentAisle === aisle);
    const customerIndexInAisle = customersInSameAisle.findIndex(c => c.id === customers[customerIndex].id);

    const maxCustomersPerRow = Math.floor(area.width / 5);
    const row = Math.floor(customerIndexInAisle / maxCustomersPerRow);
    const col = customerIndexInAisle % maxCustomersPerRow;

    const padding = 2;
    const iconWidth = 3;
    const iconHeight = 5;

    let x = area.x + padding + col * (iconWidth + 1);
    let y = area.y + padding + row * (iconHeight + 1);

    const jitterAmount = 0.3;
    x += (Math.random() - 0.5) * 2 * jitterAmount;
    y += (Math.random() - 0.5) * 2 * jitterAmount;

    x = Math.max(area.x + padding, Math.min(x, area.x + area.width - iconWidth - padding));
    y = Math.max(area.y + padding, Math.min(y, area.y + area.height - iconHeight - padding));

    return { x, y };
  };

  const formatTime = (date: Date) => date.toLocaleTimeString("de-DE", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const formatDate = (date: Date) => date.toLocaleDateString("de-DE", { year: "numeric", month: "short", day: "numeric"});


  const navItemsList = [
    { key: "dashboard", icon: Command, label: "Dashboard" },
    { key: "customer-insights", icon: UsersIcon, label: "Kunden-Insights" },
    { key: "tap-analytics", icon: Smartphone, label: "Tap & Take Analytics" },
    { key: "datenbank", icon: Database, label: "Produktdatenbank" },
    { key: "einkaufswagen", icon: ShoppingCart, label: "Warenkörbe" },
    { key: "sicherheit", icon: Shield, label: "Sicherheit" },
    { key: "ki", icon: Brain, label: "KI-Empfehlungen" },
    { key: "business", icon: Briefcase, label: "Business Intelligence" },
    { key: "marketing", icon: Gift, label: "Marketing & CX" },
    { key: "omnichannel", icon: ShoppingBag, label: "Omnichannel" },
    { key: "financial", icon: DollarSign, label: "Financial Analytics" },
  ];

  const renderActiveView = () => {
    const activeCustomersCount = getActiveCustomers().length;
    const currentTotalItems = getTotalItems();
    const currentAvgSpent = getAverageSpentPerActiveCustomer();

    const currentSelectedCustomerData = customers.find((c) => c.id === selectedCustomer) || customers[0] || rawInitialCustomers[0];
    const currentSelectedCustomerRecs = recommendationsByCustomerId[currentSelectedCustomerData.id] || [];
    const selectedCustomerHistoryData = currentSelectedCustomerData.isAnonymous ? undefined : customerHistory[currentSelectedCustomerData.id as keyof typeof customerHistory] || customerHistory[rawInitialCustomers[0].id as keyof typeof customerHistory];


    switch (activeNavItem) {
      case "dashboard":
        return (
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="border-b border-slate-700/50 pb-3 p-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-slate-100 flex items-center text-xl font-semibold">
                  <Activity className="mr-2 h-5 w-5 text-cyan-500" />
                  Einkaufsverhalten Übersicht
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-slate-800/50 text-cyan-400 border-cyan-500/50 text-xs">
                    <div className={`h-1.5 w-1.5 rounded-full mr-1 ${isSimulationRunning ? "bg-cyan-500 animate-pulse" : "bg-slate-500"}`}></div>
                    {isSimulationRunning ? "LIVE" : "BEREIT"}
                  </Badge>
                  <Button onClick={resetSimulation} variant="ghost" size="icon" className="h-8 w-8 text-slate-400"><RefreshCw className="h-4 w-4" /></Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricCard title="Aktive Kunden" value={activeCustomersCount} icon={UsersIcon} trend="up" color="cyan" detail={`${customers.length} Gesamt`} isCount />
                <MetricCard title="Artikel im Umlauf" value={currentTotalItems} icon={ShoppingBag} trend="stable" color="purple" detail="Gesamtzahl in aktiven Körben" isCount />
                <MetricCard title="Ø Umsatz / Kunde" value={currentAvgSpent} icon={BarChart3} trend="up" color="blue" detail="Durchschnitt pro aktivem Kunden" isCurrency />
              </div>
              <div className="mt-8">
                <Tabs defaultValue="map" value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <div className="flex items-center justify-between mb-4">
                    <TabsList className="bg-slate-800/50 p-1">
                      <TabsTrigger value="map" className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400">Store-Karte</TabsTrigger>
                      <TabsTrigger value="customer" className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400">Kundendetails</TabsTrigger>
                      <TabsTrigger value="analytics" className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400">Analytics</TabsTrigger>
                    </TabsList>
                  </div>
                  <TabsContent value="map" className="mt-0">
                    <div className="h-[500px] w-full relative bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
                      {storeAreas.map((area) => (
                        <div key={area.id} className={`absolute border border-slate-600/50 rounded-lg ${area.color} flex flex-col items-center justify-center text-xs font-medium backdrop-blur-sm transition-all hover:border-cyan-500/30 p-1`}
                          style={{ left: `${area.x}%`, top: `${area.y}%`, width: `${area.width}%`, height: `${area.height}%` }}>
                          <div className="text-lg mb-1">{area.icon}</div>
                          <div className="text-center leading-tight text-slate-300">{area.name}</div>
                          {area.nfcTaps > 0 && (<div className="text-xs text-cyan-400 mt-1">📱 {area.nfcTaps} Taps</div>)}
                        </div>
                      ))}
                      {customers.map((customer, customerIndex) => {
                        if (!customer.isActive || customer.currentAisle === "Verlassen") return null;
                        const position = getCustomerPosition(customer.currentAisle, customerIndex);
                        const customerColorBorder = getCustomerColorClass(customer.color, 'border').split(' ')[0].replace('border-', '');
                        const customerColorText = getCustomerColorClass(customer.color, 'text').replace('text-', 'shadow-');
                        const customerColorBgPing = getCustomerColorClass(customer.color, 'bg').replace('bg-', 'bg-opacity-100 border-2 border-');

                        return (
                          <TooltipProvider key={customer.id} delayDuration={100}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div
                                  className="absolute w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-lg bg-slate-800/70 border-2 z-20 transition-all duration-1000 ease-in-out hover:scale-110 cursor-pointer"
                                  style={{ left: `${position.x}%`, top: `${position.y}%`, transform: "translate(-50%, -50%)", borderColor: `var(--tw-color-${customerColorBorder})`, boxShadow: `0 0 15px var(--tw-color-${customerColorText})`}}
                                  onClick={() => {setSelectedCustomer(customer.id); setActiveTab("customer");}}
                                >
                                  {customer.avatar}
                                  <div className={`absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full animate-ping ${customerColorBgPing}`}></div>
                                   {!customer.isAnonymous && customer.cart.length > 0 && <div className="absolute -bottom-1 -left-1 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-green-500/80 rounded-full flex items-center justify-center text-[9px] sm:text-[10px] text-white font-bold">{customer.cart.reduce((acc, item) => acc + item.quantity, 0)}</div> }
                                </div>
                              </TooltipTrigger>
                              <TooltipContent className="bg-slate-800 border-slate-700 text-slate-200">
                                <p className="font-medium">{customer.name}</p>
                                <p className="text-xs">{customer.currentAction}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        );
                      })}
                    </div>
                  </TabsContent>
                  <TabsContent value="customer" className="mt-0">
                     <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3"> <UsersIcon className="h-4 w-4 text-cyan-500" /> <span className="text-sm text-slate-400">Kunde auswählen:</span> </div>
                        <div className="flex flex-wrap gap-2">
                            {customers.map((customer) => (
                            <Button key={customer.id} variant={selectedCustomer === customer.id ? "default" : "outline"} size="sm" onClick={() => setSelectedCustomer(customer.id)} className={`${selectedCustomer === customer.id ? "bg-cyan-600 hover:bg-cyan-700 text-white" : "border-slate-700 text-slate-300 hover:bg-slate-800"}`} >
                                <span className="mr-2">{customer.avatar}</span> {customer.name}
                            </Button>
                            ))}
                        </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card className="bg-slate-800/30 border-slate-700/50">
                                <CardHeader className="pb-2">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${getCustomerColorClass(currentSelectedCustomerData.color, 'bg')} border ${getCustomerColorClass(currentSelectedCustomerData.color, 'border')}`}> {currentSelectedCustomerData.avatar} </div>
                                    <div> <CardTitle className="text-slate-100">{currentSelectedCustomerData.name}</CardTitle> <p className="text-sm text-slate-400"> {currentSelectedCustomerData.currentAisle} • {currentSelectedCustomerData.currentAction} </p> </div>
                                </div>
                                </CardHeader>
                                <CardContent className="p-4">
                                <div className="space-y-4">
                                    <div>
                                    <div className="flex justify-between text-sm mb-1"> <span className="text-slate-400">Fortschritt</span> <span className="text-cyan-400"> {Math.round(currentSelectedCustomerData.progress)}% </span> </div>
                                    <Progress value={currentSelectedCustomerData.progress} className={`h-2 bg-slate-700 ${progressColorMap[currentSelectedCustomerData.color || 'default']}`} />
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                    <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50"> <p className="text-xs text-slate-500">Artikel</p> <p className="text-lg font-semibold text-cyan-400"> {currentSelectedCustomerData.cart.reduce((acc, item) => acc + item.quantity, 0)} </p> </div>
                                    <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50"> <p className="text-xs text-slate-500">Ausgaben</p> <p className="text-lg font-semibold text-cyan-400"> €{currentSelectedCustomerData.cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)} </p> </div>
                                    <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50"> <p className="text-xs text-slate-500">Kategorien</p> <p className="text-lg font-semibold text-cyan-400"> {new Set(currentSelectedCustomerData.cart.map((item) => item.category)).size} </p> </div>
                                    </div>
                                </div>
                                </CardContent>
                            </Card>
                            <Card className="bg-slate-800/30 border-slate-700/50">
                                <CardHeader className="pb-2"> <CardTitle className="text-slate-100 flex items-center text-base"> <BarChart3 className="mr-2 h-5 w-5 text-blue-500" /> Warenkorb-Historie <Badge variant="secondary" className="ml-2 bg-blue-900/30 text-blue-400 border-blue-500/50"> {selectedCustomerHistoryData?.totalPurchases || 0} Einkäufe </Badge> </CardTitle> </CardHeader>
                                <CardContent className="p-4">
                                {currentSelectedCustomerData.isAnonymous || !selectedCustomerHistoryData ? (<p className="text-slate-500 text-center py-4">Keine Warenkorb-Historie für anonyme Kunden verfügbar.</p>) : (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50"> <p className="text-xs text-slate-500">Ø Warenkorbwert</p> <p className="text-lg font-semibold text-blue-400"> €{(selectedCustomerHistoryData.avgBasketValue || 0).toFixed(2)} </p> </div>
                                    <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50"> <p className="text-xs text-slate-500">Einkäufe gesamt</p> <p className="text-lg font-semibold text-blue-400"> {selectedCustomerHistoryData.totalPurchases || 0} </p> </div>
                                    </div>
                                    <div>
                                    <p className="text-sm text-slate-300 mb-2">Lieblingskategorien:</p>
                                    <div className="space-y-2">
                                        {(selectedCustomerHistoryData.favoriteCategories || []).map((cat, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <div className="flex items-center gap-2"> <Badge variant="outline" className="bg-slate-800/50 border-slate-700/50 text-slate-300 text-xs"> {cat.name} </Badge> <span className={`text-xs ${cat.trend === "up" ? "text-green-400" : cat.trend === "down" ? "text-red-400" : "text-slate-400"}`}> {cat.trend === "up" ? "↗" : cat.trend === "down" ? "↘" : "→"} </span> </div>
                                            <span className="text-xs text-slate-400">{cat.percentage}%</span>
                                        </div>
                                        ))}
                                    </div>
                                    </div>
                                </div>
                                )}
                                </CardContent>
                            </Card>
                            <Card className="bg-slate-800/30 border-slate-700/50">
                                <CardHeader className="pb-2"> <CardTitle className="text-slate-100 flex items-center text-base"> <Brain className="mr-2 h-5 w-5 text-purple-500" /> KI-Empfehlungen <Badge variant="secondary" className="ml-2 bg-purple-900/30 text-purple-400 border-purple-500/50"> <Sparkles className="w-3 h-3 mr-1" /> Live AI </Badge> </CardTitle> </CardHeader>
                                <CardContent className="p-4 max-h-96 overflow-y-auto">
                                {currentSelectedCustomerData.isAnonymous ? (<p className="text-slate-500 text-center py-4">Keine KI-Empfehlungen für anonyme Kunden.</p>) :
                                currentSelectedCustomerRecs.length === 0 ? (<p className="text-slate-500 text-center py-4">Keine Empfehlungen verfügbar oder werden generiert...</p>) : (
                                    <div className="space-y-3">
                                    {currentSelectedCustomerRecs.map((rec) => (
                                        <div key={rec.product.id} className="p-3 border border-purple-500/30 rounded-lg bg-purple-900/20 hover:bg-purple-900/30 transition-all">
                                        <div className="flex items-start gap-3">
                                            <div className="text-2xl">{rec.product.image || '🛍️'}</div>
                                            <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1"> <p className="font-medium text-sm text-slate-200">{rec.product.name}</p> <Badge variant="outline" className="text-xs bg-slate-800/50 border-purple-500/30 text-purple-400"> {rec.confidence}% Sicher </Badge> </div>
                                            <p className="text-xs text-slate-500 mb-2"> €{rec.product.price.toFixed(2)} </p>
                                            <p className="text-xs text-purple-400 mb-2">{rec.reason}</p>
                                            <div className="text-xs text-slate-500 bg-slate-800/50 p-2 rounded border border-slate-700/50"> <span className="text-slate-400">KI-Analyse:</span> Basierend auf {(selectedCustomerHistoryData?.totalPurchases || 0)} Einkäufen und Präferenzen für {(selectedCustomerHistoryData?.favoriteCategories[0]?.name || 'diversen Kategorien')} </div>
                                            </div>
                                        </div>
                                        </div>
                                    ))}
                                    </div>
                                )}
                                </CardContent>
                            </Card>
                            <Card className="bg-slate-800/30 border-slate-700/50">
                                <CardHeader className="pb-2"> <CardTitle className="text-slate-100 flex items-center text-base"> <Activity className="mr-2 h-5 w-5 text-green-500" /> Einkaufsmuster </CardTitle> </CardHeader>
                                <CardContent className="p-4 max-h-96 overflow-y-auto">
                                {currentSelectedCustomerData.isAnonymous || !selectedCustomerHistoryData ? (<p className="text-slate-500 text-center py-4">Keine Einkaufsmuster für anonyme Kunden verfügbar.</p>) : (
                                <div className="space-y-3">
                                    {(selectedCustomerHistoryData.patterns || []).map((pattern, index) => (
                                    <div key={index} className="flex items-start gap-3 p-2 border border-green-500/20 rounded-lg bg-green-900/10">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                                        <p className="text-xs text-slate-300">{pattern}</p>
                                    </div>
                                    ))}
                                    {(selectedCustomerHistoryData.patterns?.length === 0) && <p className="text-slate-500 text-center py-4">Keine Muster verfügbar.</p>}
                                </div>
                                )}
                                </CardContent>
                            </Card>
                        </div>
                  </TabsContent>
                  <TabsContent value="analytics" className="mt-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="bg-slate-800/30 border-slate-700/50">
                            <CardHeader className="pb-2"> <CardTitle className="text-slate-100 flex items-center text-base"> <ShoppingCart className="mr-2 h-5 w-5 text-green-500" /> Letzte Einkäufe </CardTitle> </CardHeader>
                            <CardContent className="p-4 max-h-96 overflow-y-auto">
                            {currentSelectedCustomerData.isAnonymous || !selectedCustomerHistoryData ? (<p className="text-slate-500 text-center py-4">Keine Daten für anonyme Kunden.</p>) : (
                            <div className="space-y-3">
                                {(selectedCustomerHistoryData.recentPurchases || []).map((purchase, index) => (
                                <div key={index} className="p-3 border border-green-500/30 rounded-lg bg-green-900/20">
                                    <p className="text-sm text-slate-300">{formatDate(new Date(purchase.date))}</p>
                                    <p className="text-xs text-slate-500">{purchase.items.join(", ")}</p>
                                    <div className="flex items-center justify-between mt-2"> <span className="text-xs text-slate-400">Gesamt:</span> <span className="text-sm text-green-400">€{purchase.total.toFixed(2)}</span> </div>
                                </div>
                                ))}
                                 {(selectedCustomerHistoryData.recentPurchases?.length === 0) && <p className="text-slate-500 text-center py-4">Keine kürzlichen Einkäufe.</p>}
                            </div>
                            )}
                            </CardContent>
                        </Card>
                        <Card className="bg-slate-800/30 border-slate-700/50">
                            <CardHeader className="pb-2"> <CardTitle className="text-slate-100 flex items-center text-base"> <BarChart3 className="mr-2 h-5 w-5 text-blue-500" /> Kategorie-Übersicht </CardTitle> </CardHeader>
                            <CardContent className="p-4 max-h-96 overflow-y-auto">
                             {currentSelectedCustomerData.isAnonymous || !selectedCustomerHistoryData ? (<p className="text-slate-500 text-center py-4">Keine Daten für anonyme Kunden.</p>) : (
                            <div className="space-y-3">
                                {(selectedCustomerHistoryData.favoriteCategories || []).map((category, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2"> <span className="text-sm text-slate-300">{category.name}</span> </div>
                                    <span className="text-sm text-blue-400">{category.percentage}%</span>
                                </div>
                                ))}
                                {(selectedCustomerHistoryData.favoriteCategories?.length === 0) && <p className="text-slate-500 text-center py-4">Keine Kategoriedaten.</p>}
                            </div>
                            )}
                            </CardContent>
                        </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        );
      case "customer-insights":
        return (
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="border-b border-slate-700/50 pb-3 p-6">
                <CardTitle className="text-slate-100 flex items-center text-xl font-semibold">
                <UsersIcon className="mr-2 h-5 w-5 text-cyan-500" />
                Kunden-Insights (Illustrativ)
                <Badge variant="outline" className="ml-2 bg-slate-800/50 text-slate-400 border-slate-700/50 text-xs">
                    Illustrative Demografie &amp; KI-Segmente
                </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
                    <Card className="bg-slate-800/30 border-slate-700/50">
                        <CardHeader className="pb-2">
                        <CardTitle className="text-slate-100 flex items-center text-base">
                            <PieChart className="mr-2 h-5 w-5 text-purple-500" />
                            Altersverteilung
                        </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 space-y-3">
                        {customerDemographicsData.ageDistribution.map(ageGroup => (
                            <div key={ageGroup.range}>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-slate-300">{ageGroup.range} Jahre</span>
                                <span style={{ color: ageGroup.color }}>{ageGroup.percentage}%</span>
                            </div>
                            <Progress value={ageGroup.percentage} className={cn("h-2 bg-slate-700", `[&>div]:bg-[${ageGroup.color.replace('hsl(var(--chart-', 'var(--chart-').slice(0, -1)}]`)} />
                            </div>
                        ))}
                        </CardContent>
                    </Card>

                    <Card className="bg-slate-800/30 border-slate-700/50">
                        <CardHeader className="pb-2">
                        <CardTitle className="text-slate-100 flex items-center text-base">
                            <UsersIcon className="mr-2 h-5 w-5 text-blue-500" />
                            Geschlechterverteilung
                        </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 space-y-3">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-slate-300">Männlich</span>
                                    <span className="text-blue-400">{customerDemographicsData.genderDistribution.malePercent}%</span>
                                </div>
                                <Progress value={customerDemographicsData.genderDistribution.malePercent} className="h-2 bg-slate-700 [&>div]:bg-blue-500" />
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-slate-300">Weiblich</span>
                                    <span className="text-pink-400">{customerDemographicsData.genderDistribution.femalePercent}%</span>
                                </div>
                                <Progress value={customerDemographicsData.genderDistribution.femalePercent} className="h-2 bg-slate-700 [&>div]:bg-pink-500" />
                            </div>
                             <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-slate-300">Andere</span>
                                    <span className="text-slate-400">{customerDemographicsData.genderDistribution.otherPercent}%</span>
                                </div>
                                <Progress value={customerDemographicsData.genderDistribution.otherPercent} className="h-2 bg-slate-700 [&>div]:bg-slate-500" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-slate-800/30 border-slate-700/50">
                        <CardHeader className="pb-2">
                        <CardTitle className="text-slate-100 flex items-center text-base">
                            <DollarSign className="mr-2 h-5 w-5 text-green-500" />
                            Kundenwert &amp; Loyalität
                        </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 space-y-3">
                            <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                                <p className="text-xs text-slate-500">Ø Customer Lifetime Value</p>
                                <p className="text-lg font-semibold text-green-400">€{customerDemographicsData.avgCustomerLifetimeValue.toFixed(2)}</p>
                            </div>
                            <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                                <p className="text-xs text-slate-500">Neukunden vs. Stammkunden</p>
                                <p className="text-lg font-semibold text-cyan-400">{customerDemographicsData.newVsReturningCustomers.new}% / {customerDemographicsData.newVsReturningCustomers.returning}%</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <Card className="bg-slate-800/30 border-slate-700/50">
                        <CardHeader className="pb-2">
                        <CardTitle className="text-slate-100 flex items-center text-base">
                            <UsersIcon className="mr-2 h-5 w-5 text-amber-500" />
                            Beziehungs- &amp; Haushalts-Insights (KI-Schätzung)
                        </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 space-y-4">
                            <div className="p-3 border border-amber-500/30 rounded-lg bg-amber-900/10">
                                <p className="text-sm text-slate-300">Geschätzte Paare im Kundenstamm</p>
                                <p className="text-lg font-semibold text-amber-400">{relationshipInsightData.estimatedCouplesCount} Paare</p>
                            </div>
                            <div className="p-3 border border-amber-500/30 rounded-lg bg-amber-900/10">
                                <p className="text-sm text-slate-300 mb-1">Häufige Produktkombinationen (Paare):</p>
                                {relationshipInsightData.commonPairPurchases.map(pair => (
                                    <Badge key={`${pair.item1}-${pair.item2}`} variant="outline" className="mr-1 mb-1 bg-slate-800/50 border-amber-500/40 text-amber-300 text-xs">
                                        {pair.item1} + {pair.item2} ({pair.frequency})
                                    </Badge>
                                ))}
                            </div>
                             <div className="p-3 border border-green-500/30 rounded-lg bg-green-900/10">
                                <p className="text-sm text-slate-300">Geschätzte Familien im Kundenstamm</p>
                                <p className="text-lg font-semibold text-green-400">{relationshipInsightData.estimatedFamilyCount} Familien</p>
                            </div>
                            <div className="p-3 border border-green-500/30 rounded-lg bg-green-900/10">
                                <p className="text-sm text-slate-300 mb-1">Typische Familien-Produkte:</p>
                                {relationshipInsightData.typicalFamilyProducts.map(prod => (
                                     <Badge key={prod} variant="outline" className="mr-1 mb-1 bg-slate-800/50 border-green-500/40 text-green-300 text-xs">{prod}</Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-slate-800/30 border-slate-700/50">
                        <CardHeader className="pb-2">
                        <CardTitle className="text-slate-100 flex items-center text-base">
                            <Brain className="mr-2 h-5 w-5 text-pink-500" />
                            Top KI-basierte Kundensegmente (Illustrativ)
                        </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 space-y-3">
                            {customerSegmentsData.slice(0,3).map(segment => (
                                <div key={segment.name} className="p-3 rounded-lg border" style={{borderColor: `${segment.color.replace('hsl(var(--chart-', 'hsla(var(--chart-').replace('))', ', 0.3))')}`, backgroundColor: `${segment.color.replace('hsl(var(--chart-', 'hsla(var(--chart-').replace('))', ', 0.1))')}`}}>
                                    <h4 className="font-semibold text-sm mb-1" style={{color: segment.color}}>{segment.name} ({segment.percentage}%)</h4>
                                    <p className="text-xs text-slate-100 mb-1">{segment.description}</p>
                                    <div className="space-x-1">
                                    {segment.keyCharacteristics.slice(0,2).map(char => (
                                        <Badge
                                          key={char}
                                          style={{ backgroundColor: segment.color, borderColor: segment.color, color: "hsl(var(--primary-foreground))" }}
                                          className="text-xs hover:opacity-90"
                                        >
                                          {char}
                                        </Badge>
                                    ))}
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
                <p className="text-xs text-center text-slate-500 mt-4">Hinweis: Die dargestellten demografischen Daten und KI-Segmente sind illustrativ und basieren auf Mock-Daten, da in der aktuellen Simulation keine realen demografischen Kundendaten erfasst werden.</p>
            </CardContent>
            </Card>
        );
      case "business":
        return (
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="border-b border-slate-700/50 pb-3 p-6">
                <CardTitle className="text-slate-100 flex items-center text-xl font-semibold">
                <Briefcase className="mr-2 h-5 w-5 text-cyan-500" />
                Business Intelligence Dashboard
                <Badge variant="secondary" className="ml-2 bg-green-900/30 text-green-400 border-green-500/50">
                    Live Data
                </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-slate-300 flex items-center">
                    <MapPin className="mr-2 h-5 w-5 text-blue-500" />
                    Regionale Performance
                    </h3>
                    <div className="flex items-center space-x-2">
                    <select className="text-xs bg-slate-800 border border-slate-700 rounded px-2 py-1 text-slate-300 focus:ring-cyan-500 focus:border-cyan-500">
                        <option>Alle Regionen</option>
                        <option>Nord</option>
                        <option>Süd</option>
                        <option>Ost</option>
                        <option>West</option>
                    </select>
                    <Badge
                        variant="outline"
                        className="bg-slate-800/50 text-slate-400 border-slate-700/50 text-xs"
                    >
                        {regionalPerformanceData.reduce((sum, r) => sum + r.locations, 0)} Standorte
                    </Badge>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {regionalPerformanceData.map(region => (
                    <div key={region.region} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50 hover:border-cyan-500/30 transition-colors">
                        <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-400">Region {region.region}</p>
                        <Badge
                            variant="outline"
                            className={`${region.trend >= 0 ? 'bg-green-900/20 text-green-400 border-green-500/50' : 'bg-red-900/20 text-red-400 border-red-500/50'} text-xs`}
                        >
                            {region.trend >= 0 ? '+' : ''}{region.trend}%
                        </Badge>
                        </div>
                        <p className={`text-xl font-semibold ${region.trend >=0 ? 'text-green-400' : 'text-red-400'}`}>€{region.revenue.toLocaleString('de-DE')}</p>
                        <p className="text-xs text-slate-500">{region.locations} Standorte • Ø €{(region.revenue / region.locations).toLocaleString('de-DE', {maximumFractionDigits:0})}</p>
                    </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <Card className="bg-slate-800/30 border-slate-700/50">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-slate-100 flex items-center text-base">
                        <TrendingUp className="mr-2 h-5 w-5 text-green-500" />
                        Top Performer Standorte
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-2">
                        {topPerformerStoresData.map(store => (
                        <div key={store.name} className="flex items-center justify-between p-2.5 border border-green-500/20 rounded-lg bg-green-900/10 hover:bg-green-900/20 transition-colors">
                            <div>
                            <span className="text-sm text-slate-200">{store.name}</span>
                            <p className="text-xs text-slate-500">Region {store.region}</p>
                            </div>
                            <div className="text-right">
                            <span className="text-sm text-green-300">€{store.revenue.toLocaleString('de-DE')}</span>
                            <p className="text-xs text-green-500">+{store.trend}%</p>
                            </div>
                        </div>
                        ))}
                    </CardContent>
                    </Card>

                    <Card className="bg-slate-800/30 border-slate-700/50">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-slate-100 flex items-center text-base">
                        <TrendingDown className="mr-2 h-5 w-5 text-red-500" />
                        Optimierungsbedarf Standorte
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-2">
                        {bottomPerformerStoresData.map(store => (
                        <div key={store.name} className="flex items-center justify-between p-2.5 border border-red-500/20 rounded-lg bg-red-900/10 hover:bg-red-900/20 transition-colors">
                            <div>
                            <span className="text-sm text-slate-200">{store.name}</span>
                            <p className="text-xs text-slate-500">Region {store.region}</p>
                            </div>
                            <div className="text-right">
                            <span className="text-sm text-red-300">€{store.revenue.toLocaleString('de-DE')}</span>
                            <p className={`text-xs ${store.trend >=0 ? 'text-green-500' : 'text-red-500'}`}>{store.trend >=0 ? '+' : ''}{store.trend}%</p>
                            </div>
                        </div>
                        ))}
                    </CardContent>
                    </Card>
                </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                <Card className="bg-slate-800/30 border-slate-700/50">
                    <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 flex items-center text-base">
                        <DollarSign className="mr-2 h-5 w-5 text-green-500" />
                        Umsatz-Übersicht
                    </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                            <p className="text-xs text-slate-500">Heute</p>
                            <p className="text-lg font-semibold text-green-400">€{revenueOverviewData.today.toLocaleString('de-DE')}</p>
                            <p className={`text-xs ${revenueOverviewData.todayTrend >=0 ? 'text-green-400': 'text-red-400'}`}>{revenueOverviewData.todayTrend >=0 ? '+' : ''}{revenueOverviewData.todayTrend}% vs gestern</p>
                        </div>
                        <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                            <p className="text-xs text-slate-500">Diese Woche</p>
                            <p className="text-lg font-semibold text-blue-400">€{revenueOverviewData.thisWeek.toLocaleString('de-DE')}</p>
                            <p className={`text-xs ${revenueOverviewData.weekTrend >=0 ? 'text-blue-400': 'text-red-400'}`}>{revenueOverviewData.weekTrend >=0 ? '+' : ''}{revenueOverviewData.weekTrend}% vs letzte Woche</p>
                        </div>
                        </div>
                        <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                        <p className="text-xs text-slate-500">Monats-Ziel (€{revenueOverviewData.monthlyTarget.toLocaleString('de-DE')})</p>
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-lg font-semibold text-purple-400">€{(revenueOverviewData.monthlyTarget * revenueOverviewData.monthlyProgress / 100).toLocaleString('de-DE')}</span>
                            <span className="text-sm text-purple-400">{revenueOverviewData.monthlyProgress}%</span>
                        </div>
                        <Progress value={revenueOverviewData.monthlyProgress} className="h-2.5 bg-slate-700 [&>div]:bg-purple-500" />
                        </div>
                    </div>
                    </CardContent>
                </Card>

                <Card className="bg-slate-800/30 border-slate-700/50">
                    <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 flex items-center text-base">
                        <PieChart className="mr-2 h-5 w-5 text-purple-500" />
                        Gewinnspannen nach Kategorie
                    </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-2.5">
                    {profitMarginByCategoryData.map(cat => (
                        <div key={cat.category} className="flex items-center justify-between p-2.5 border rounded-lg hover:shadow-lg transition-all" style={{borderColor: cat.color || `hsl(var(--chart-${profitMarginByCategoryData.indexOf(cat) + 1}))`, backgroundColor: `${cat.color ? cat.color.replace('hsl(','hsla(').replace(')',' / 0.1)') : `hsla(var(--chart-${profitMarginByCategoryData.indexOf(cat) + 1}), 0.1)`}`}}>
                        <span className="text-sm text-slate-300">{cat.category}</span>
                        <span className="text-sm font-medium" style={{color: cat.color || `hsl(var(--chart-${profitMarginByCategoryData.indexOf(cat) + 1}))`}}>{cat.margin}%</span>
                        </div>
                    ))}
                    </CardContent>
                </Card>

                <Card className="bg-slate-800/30 border-slate-700/50">
                    <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 flex items-center text-base">
                        <Target className="mr-2 h-5 w-5 text-blue-500" />
                        Regionale Marktanalyse
                    </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-3">
                    <div className="p-3 border border-blue-500/30 rounded-lg bg-blue-900/10">
                        <p className="text-sm text-slate-300">Marktanteil (Region Nord)</p>
                        <p className="text-lg font-semibold text-blue-400">{regionalMarketAnalysisData.marketShare}%</p>
                        <p className={`text-xs ${regionalMarketAnalysisData.marketShareTrend >=0 ? 'text-blue-400': 'text-red-400'}`}>{regionalMarketAnalysisData.marketShareTrend >=0 ? '+' : ''}{regionalMarketAnalysisData.marketShareTrend}% vs Vorjahr</p>
                    </div>
                    <div className="p-3 border border-cyan-500/30 rounded-lg bg-cyan-900/10">
                        <p className="text-sm text-slate-300">Wettbewerbsdichte</p>
                        <p className="text-lg font-semibold text-cyan-400">{regionalMarketAnalysisData.competitionLevel}</p>
                        <p className="text-xs text-cyan-400">{regionalMarketAnalysisData.competitors} direkte Konkurrenten</p>
                    </div>
                    <div className="p-3 border border-purple-500/30 rounded-lg bg-purple-900/10">
                        <p className="text-sm text-slate-300">Top Regionaler Trend</p>
                        <p className="text-lg font-semibold text-purple-400">{regionalMarketAnalysisData.topTrend} ↗</p>
                        <p className="text-xs text-purple-400">+{regionalMarketAnalysisData.topTrendGrowth}% Nachfrage</p>
                    </div>
                    </CardContent>
                </Card>

                <Card className="bg-slate-800/30 border-slate-700/50">
                    <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 flex items-center text-base">
                        <Filter className="mr-2 h-5 w-5 text-cyan-500" />
                        A/B Testing Ergebnisse
                    </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-2">
                    {abTestingResultsData.map(test => (
                        <div key={test.name} className="p-3 border border-cyan-500/20 rounded-lg bg-cyan-900/10 hover:border-cyan-500/40 transition-colors">
                        <p className="text-sm font-medium text-slate-200">{test.name}</p>
                        <p className="text-xs text-slate-400">Bereich: {test.area} • Metrik: {test.metric}</p>
                        <p className={`text-lg font-semibold ${test.impact >=0 ? 'text-green-400' : 'text-red-400'}`}>{test.impact >=0 ? '+' : ''}{test.impact}%</p>
                        </div>
                    ))}
                    </CardContent>
                </Card>

                <Card className="bg-slate-800/30 border-slate-700/50">
                    <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 flex items-center text-base">
                        <Zap className="mr-2 h-5 w-5 text-amber-500" />
                        Saisonalitäts-Trends
                    </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-3">
                    <div className="p-3 border border-amber-500/30 rounded-lg bg-amber-900/10">
                        <p className="text-sm text-slate-300">Aktuelle Saison: {seasonalityTrendsData.currentSeason}</p>
                        <p className="text-lg font-semibold text-amber-400">Top-Kategorie: {seasonalityTrendsData.topCategory} (+{seasonalityTrendsData.topCategoryTrend}%)</p>
                    </div>
                    <div className="p-3 border border-green-500/30 rounded-lg bg-green-900/10">
                        <p className="text-sm text-slate-300">Saisonale Produkte</p>
                        <p className="text-lg font-semibold text-green-400">{seasonalityTrendsData.seasonalProducts.join(' &amp; ')}</p>
                        <p className="text-xs text-green-400">+{seasonalityTrendsData.seasonalProductTrend}% vs Vor-Saison</p>
                    </div>
                    <div className="p-3 border border-blue-500/30 rounded-lg bg-blue-900/10">
                        <p className="text-sm text-slate-300">Prognose Nächste Saison</p>
                        <p className="text-lg font-semibold text-blue-400">+{seasonalityTrendsData.nextSeasonForecast}% Umsatz</p>
                        <p className="text-xs text-blue-400">Basierend auf 5-Jahres-Trend</p>
                    </div>
                    </CardContent>
                </Card>

                <Card className="bg-slate-800/30 border-slate-700/50">
                    <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 flex items-center text-base">
                        <ListChecks className="mr-2 h-5 w-5 text-green-500" />
                        Ø Standort-Performance
                    </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 grid grid-cols-2 gap-3 text-xs">
                        <div className="bg-slate-800/50 p-2 rounded border border-slate-700/50"><span className="text-slate-400">Umsatz/m²:</span> <span className="text-green-300 font-medium">€{storeComparisonData.avgRevenuePerSqFt}</span></div>
                        <div className="bg-slate-800/50 p-2 rounded border border-slate-700/50"><span className="text-slate-400">Kunden/Tag:</span> <span className="text-green-300 font-medium">{storeComparisonData.avgCustomersPerDay}</span></div>
                        <div className="bg-slate-800/50 p-2 rounded border border-slate-700/50"><span className="text-slate-400">Ø Warenkorb:</span> <span className="text-green-300 font-medium">€{storeComparisonData.avgBasketValue.toFixed(2)}</span></div>
                        <div className="bg-slate-800/50 p-2 rounded border border-slate-700/50"><span className="text-slate-400">Conversion:</span> <span className="text-green-300 font-medium">{storeComparisonData.conversionRate}%</span></div>
                        <div className="bg-slate-800/50 p-2 rounded border border-slate-700/50"><span className="text-slate-400">MA Zufriedenheit:</span> <span className="text-green-300 font-medium">{storeComparisonData.employeeSatisfactionRate}%</span></div>
                        <div className="bg-slate-800/50 p-2 rounded border border-slate-700/50"><span className="text-slate-400">Inventar Umlauf:</span> <span className="text-green-300 font-medium">{storeComparisonData.inventoryTurnoverRate}x</span></div>
                    </CardContent>
                </Card>
                </div>
            </CardContent>
            </Card>
        );
      case "omnichannel":
        return (
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="border-b border-slate-700/50 pb-3 p-6">
                <CardTitle className="text-slate-100 flex items-center text-xl font-semibold">
                <ShoppingBag className="mr-2 h-5 w-5 text-cyan-500" />
                Omnichannel Integration
                <Badge variant="secondary" className="ml-2 bg-blue-900/30 text-blue-400 border-blue-500/50">
                    Multi-Channel
                </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                <Card className="bg-slate-800/30 border-slate-700/50">
                    <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 flex items-center text-base">
                        <ShoppingCart className="mr-2 h-5 w-5 text-green-500" />
                        Click &amp; Collect
                    </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                            <p className="text-xs text-slate-500">Bestellungen heute</p>
                            <p className="text-lg font-semibold text-green-400">{omnichannelClickCollectData.ordersToday}</p>
                            <p className="text-xs text-green-400">+23% vs gestern</p>
                        </div>
                        <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                            <p className="text-xs text-slate-500">Abholbereit</p>
                            <p className="text-lg font-semibold text-blue-400">{omnichannelClickCollectData.readyForPickup}</p>
                            <p className="text-xs text-blue-400">Ø {omnichannelClickCollectData.avgProcessingTimeMinutes} min Bearbeitungszeit</p>
                        </div>
                        </div>
                        <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-300">Pünktliche Abholung</span>
                            <span className="text-sm text-green-400">{omnichannelClickCollectData.onTimePickupRate}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-300">Kundenzufriedenheit</span>
                            <span className="text-sm text-blue-400">{omnichannelClickCollectData.satisfactionRate}/5 ⭐</span>
                        </div>
                        </div>
                    </div>
                    </CardContent>
                </Card>

                <Card className="bg-slate-800/30 border-slate-700/50">
                    <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 flex items-center text-base">
                        <Server className="mr-2 h-5 w-5 text-cyan-500" />
                        E-Commerce Integration
                    </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-3">
                    <div className="p-3 border border-cyan-500/30 rounded-lg bg-cyan-900/10">
                        <p className="text-sm text-slate-300">Online-Bestellungen heute</p>
                        <p className="text-lg font-semibold text-cyan-400">{omnichannelEcommerceData.onlineOrdersToday}</p>
                        <p className="text-xs text-cyan-400">€{omnichannelEcommerceData.onlineRevenueToday.toLocaleString('de-DE')} Umsatz • +{omnichannelEcommerceData.onlineRevenueTrend}% vs gestern</p>
                    </div>
                    <div className="p-3 border border-purple-500/30 rounded-lg bg-purple-900/10">
                        <p className="text-sm text-slate-300">Live-Kunden im Store (Online-Track)</p>
                        <p className="text-lg font-semibold text-purple-400">{omnichannelEcommerceData.liveCustomersVisibleInStore} aktiv</p>
                    </div>
                    <div className="p-3 border border-amber-500/30 rounded-lg bg-amber-900/10">
                        <p className="text-sm text-slate-300">Cross-Channel Conversion</p>
                        <p className="text-lg font-semibold text-amber-400">{omnichannelEcommerceData.crossChannelConversionRate}%</p>
                        <p className="text-xs text-amber-400">Online → Offline Käufe</p>
                    </div>
                    </CardContent>
                </Card>

                <Card className="bg-slate-800/30 border-slate-700/50">
                    <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 flex items-center text-base">
                        <UsersIcon className="mr-2 h-5 w-5 text-pink-500" />
                        Unified Customer Journey
                    </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-3">
                    <div className="p-3 border border-pink-500/30 rounded-lg bg-pink-900/10">
                        <p className="text-sm text-slate-300">360° Kundensicht</p>
                        <p className="text-lg font-semibold text-pink-400">{omnichannelUnifiedJourneyData.customersWithUnifiedProfile.toLocaleString('de-DE')}</p>
                        <p className="text-xs text-pink-400">Kunden mit Online+Offline Profil</p>
                    </div>
                    <div className="p-3 border border-green-500/30 rounded-lg bg-green-900/10">
                        <p className="text-sm text-slate-300">Personalisierung aktiv</p>
                        <p className="text-lg font-semibold text-green-400">{omnichannelUnifiedJourneyData.personalizationActiveRate}%</p>
                        <p className="text-xs text-green-400">KI-basierte Empfehlungen</p>
                    </div>
                    <div className="p-3 border border-blue-500/30 rounded-lg bg-blue-900/10">
                        <p className="text-sm text-slate-300">Omnichannel Warenkörbe</p>
                        <p className="text-lg font-semibold text-blue-400">{omnichannelUnifiedJourneyData.syncedCarts}</p>
                        <p className="text-xs text-blue-400">Synchronisiert zw. Kanälen</p>
                    </div>
                    </CardContent>
                </Card>

                <Card className="bg-slate-800/30 border-slate-700/50">
                    <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 flex items-center text-base">
                        <Smartphone className="mr-2 h-5 w-5 text-purple-500" />
                        Mobile App Analytics
                    </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-3">
                    <div className="p-3 border border-purple-500/30 rounded-lg bg-purple-900/10">
                        <p className="text-sm text-slate-300">Aktive App-Nutzer</p>
                        <p className="text-lg font-semibold text-purple-400">{omnichannelMobileAppData.activeUsers.toLocaleString('de-DE')}</p>
                        <p className="text-xs text-purple-400">+8.7% diese Woche</p>
                    </div>
                    <div className="p-3 border border-cyan-500/30 rounded-lg bg-cyan-900/10">
                        <p className="text-sm text-slate-300">In-Store Navigation Nutzer</p>
                        <p className="text-lg font-semibold text-cyan-400">{omnichannelMobileAppData.inStoreNavigationUsers.toLocaleString('de-DE')}</p>
                    </div>
                    <div className="p-3 border border-amber-500/30 rounded-lg bg-amber-900/10">
                        <p className="text-sm text-slate-300">In-App Käufe Umsatz</p>
                        <p className="text-lg font-semibold text-amber-400">€{omnichannelMobileAppData.inAppPurchasesRevenue.toLocaleString('de-DE')}</p>
                        <p className="text-xs text-amber-400">{omnichannelMobileAppData.inAppPurchasesPercentOfOnline}% des Online-Umsatzes</p>
                    </div>
                    </CardContent>
                </Card>

                <Card className="bg-slate-800/30 border-slate-700/50">
                    <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 flex items-center text-base">
                        <Database className="mr-2 h-5 w-5 text-orange-500" />
                        Echtzeit-Bestandssynchronisation
                    </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-3">
                    <div className="p-3 border border-orange-500/30 rounded-lg bg-orange-900/10">
                        <p className="text-sm text-slate-300">Sync-Status</p>
                        <p className="text-lg font-semibold text-orange-400">{omnichannelInventorySyncData.syncStatusPercent}%</p>
                        <p className="text-xs text-orange-400">Online ↔ Offline Bestände</p>
                    </div>
                    <div className="p-3 border border-green-500/30 rounded-lg bg-green-900/10">
                        <p className="text-sm text-slate-300">Verfügbarkeits-Updates heute</p>
                        <p className="text-lg font-semibold text-green-400">{omnichannelInventorySyncData.availabilityUpdatesToday.toLocaleString('de-DE')}</p>
                    </div>
                    <div className="p-3 border border-red-500/30 rounded-lg bg-red-900/10">
                        <p className="text-sm text-slate-300">Out-of-Stock Alerts (Online)</p>
                        <p className="text-lg font-semibold text-red-400">{omnichannelInventorySyncData.outOfStockAlertsToOnline}</p>
                    </div>
                    </CardContent>
                </Card>

                <Card className="bg-slate-800/30 border-slate-700/50">
                    <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 flex items-center text-base">
                        <Sparkles className="mr-2 h-5 w-5 text-pink-500" />
                        Social Commerce Performance
                    </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-3">
                    <div className="p-3 border border-pink-500/30 rounded-lg bg-pink-900/10">
                        <p className="text-sm text-slate-300">Instagram Shopping Umsatz</p>
                        <p className="text-lg font-semibold text-pink-400">€{omnichannelSocialCommerceData.instagramSalesRevenue.toLocaleString('de-DE')}</p>
                        <p className="text-xs text-pink-400">{omnichannelSocialCommerceData.instagramSalesCount} Verkäufe</p>
                    </div>
                    <div className="p-3 border border-blue-500/30 rounded-lg bg-blue-900/10">
                        <p className="text-sm text-slate-300">TikTok Integration Umsatz</p>
                        <p className="text-lg font-semibold text-blue-400">€{omnichannelSocialCommerceData.tiktokSalesRevenue.toLocaleString('de-DE')}</p>
                        <p className="text-xs text-blue-400">+{omnichannelSocialCommerceData.tiktokSalesGrowthPercent}% Wachstum</p>
                    </div>
                    <div className="p-3 border border-green-500/30 rounded-lg bg-green-900/10">
                        <p className="text-sm text-slate-300">Live-Shopping Events Umsatz</p>
                        <p className="text-lg font-semibold text-green-400">€{omnichannelSocialCommerceData.liveShoppingRevenue.toLocaleString('de-DE')}</p>
                        <p className="text-xs text-green-400">Store-to-Stream Integration</p>
                    </div>
                    </CardContent>
                </Card>

                <Card className="bg-slate-800/30 border-slate-700/50 lg:col-span-2 xl:col-span-3">
                    <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 flex items-center text-base">
                        <BarChart3 className="mr-2 h-5 w-5 text-cyan-500" />
                        Omnichannel Performance Dashboard
                    </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="p-4 border border-cyan-500/30 rounded-lg bg-cyan-900/10">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-slate-300">Online Store</p>
                            <Badge variant="outline" className="bg-cyan-900/30 text-cyan-400 border-cyan-500/50 text-xs">
                            Live
                            </Badge>
                        </div>
                        <p className="text-lg font-semibold text-cyan-400">€{omnichannelEcommerceData.onlineRevenueToday.toLocaleString('de-DE')}</p>
                        <p className="text-xs text-cyan-400">{omnichannelEcommerceData.onlineOrdersToday} Bestellungen • {omnichannelEcommerceData.crossChannelConversionRate}% Cross-Conv.</p>
                        <div className="mt-2 text-xs text-slate-500">
                            • {omnichannelEcommerceData.liveCustomersVisibleInStore} Kunden live im Store sichtbar<br/>
                            • Echtzeit-Bestandsabgleich: {omnichannelInventorySyncData.syncStatusPercent}%<br/>
                        </div>
                        </div>
                        <div className="p-4 border border-green-500/30 rounded-lg bg-green-900/10">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-slate-300">Offline Store (Tap&amp;Take)</p>
                            <Badge variant="outline" className="bg-green-900/30 text-green-400 border-green-500/50 text-xs">
                            Aktiv
                            </Badge>
                        </div>
                        <p className="text-lg font-semibold text-green-400">€{getTotalSpent().toLocaleString("de-DE", {maximumFractionDigits: 0})}</p>
                        <p className="text-xs text-green-400">{omnichannelClickCollectData.ordersToday} Click &amp; Collect • {omnichannelClickCollectData.onTimePickupRate}% pünktlich</p>
                        <div className="mt-2 text-xs text-slate-500">
                            • {getActiveCustomers().length} aktive Simulationskunden<br/>
                            • KI-Empfehlungen: {Object.values(recommendationsByCustomerId).flat().length > 0 ? 'Aktiv' : 'Inaktiv'}<br/>
                        </div>
                        </div>
                        <div className="p-4 border border-purple-500/30 rounded-lg bg-purple-900/10">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-slate-300">Mobile App</p>
                            <Badge variant="outline" className="bg-purple-900/30 text-purple-400 border-purple-500/50 text-xs">
                            {omnichannelMobileAppData.activeUsers.toLocaleString('de-DE')} aktiv
                            </Badge>
                        </div>
                        <p className="text-lg font-semibold text-purple-400">€{omnichannelMobileAppData.inAppPurchasesRevenue.toLocaleString('de-DE')}</p>
                        <p className="text-xs text-purple-400">{omnichannelMobileAppData.inStoreNavigationUsers.toLocaleString('de-DE')} In-Store Nav. • {omnichannelUnifiedJourneyData.syncedCarts} Sync-Körbe</p>
                        <div className="mt-2 text-xs text-slate-500">
                            • Personalisierung: {omnichannelUnifiedJourneyData.personalizationActiveRate}%<br/>
                        </div>
                        </div>
                        <div className="p-4 border border-pink-500/30 rounded-lg bg-pink-900/10">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-slate-300">Social Commerce</p>
                            <Badge variant="outline" className="bg-pink-900/30 text-pink-400 border-pink-500/50 text-xs">
                            Multi-Platform
                            </Badge>
                        </div>
                        <p className="text-lg font-semibold text-pink-400">€{(omnichannelSocialCommerceData.instagramSalesRevenue + omnichannelSocialCommerceData.tiktokSalesRevenue + omnichannelSocialCommerceData.liveShoppingRevenue).toLocaleString('de-DE')}</p>
                        <p className="text-xs text-pink-400">{omnichannelSocialCommerceData.instagramSalesCount + (omnichannelSocialCommerceData.tiktokSalesRevenue > 0 ? 23 : 0) } Social Verkäufe</p>
                        <div className="mt-2 text-xs text-slate-500">
                            • Instagram: €{omnichannelSocialCommerceData.instagramSalesRevenue.toLocaleString('de-DE')}<br/>
                            • TikTok: €{omnichannelSocialCommerceData.tiktokSalesRevenue.toLocaleString('de-DE')} (+{omnichannelSocialCommerceData.tiktokSalesGrowthPercent}%)<br/>
                        </div>
                        </div>
                    </div>
                    </CardContent>
                </Card>
                </div>
            </CardContent>
            </Card>
        );
        case "financial":
            return (
                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="border-b border-slate-700/50 pb-3 p-6">
                    <CardTitle className="text-slate-100 flex items-center text-xl font-semibold">
                    <DollarSign className="mr-2 h-5 w-5 text-cyan-500" />
                    Financial Analytics
                    <Badge variant="secondary" className="ml-2 bg-green-900/30 text-green-400 border-green-500/50">
                        €{financialCashflowData.netCashflow.toLocaleString('de-DE')} Netto Heute
                    </Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    <Card className="bg-slate-800/30 border-slate-700/50">
                        <CardHeader className="pb-2">
                        <CardTitle className="text-slate-100 flex items-center text-base">
                            <Activity className="mr-2 h-5 w-5 text-green-500" />
                            Cashflow-Übersicht
                        </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-800/50 p-3 rounded-lg border border-green-700/50">
                                <p className="text-xs text-slate-500">Einnahmen heute</p>
                                <p className="text-lg font-semibold text-green-400">€{financialCashflowData.revenueToday.toLocaleString('de-DE')}</p>
                                <p className={`text-xs ${financialCashflowData.revenueTrend >=0 ? 'text-green-400' : 'text-red-400'}`}>{financialCashflowData.revenueTrend >=0 ? '+' : ''}{financialCashflowData.revenueTrend}% vs gestern</p>
                            </div>
                            <div className="bg-slate-800/50 p-3 rounded-lg border border-red-700/50">
                                <p className="text-xs text-slate-500">Ausgaben heute</p>
                                <p className="text-lg font-semibold text-red-400">€{financialCashflowData.expensesToday.toLocaleString('de-DE')}</p>
                                <p className="text-xs text-red-400">{financialCashflowData.expensesCategory}</p>
                            </div>
                            </div>
                            <div className="bg-slate-800/50 p-3 rounded-lg border border-blue-700/50">
                            <p className="text-xs text-slate-500">Netto-Cashflow</p>
                            <p className="text-lg font-semibold text-blue-400">€{financialCashflowData.netCashflow.toLocaleString('de-DE')}</p>
                            <p className="text-xs text-blue-400">Gewinnmarge: {financialCashflowData.profitMargin}%</p>
                            </div>
                        </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-slate-800/30 border-slate-700/50">
                        <CardHeader className="pb-2">
                        <CardTitle className="text-slate-100 flex items-center text-base">
                            <ShoppingCart className="mr-2 h-5 w-5 text-purple-500" />
                            Zahlungsmethoden
                        </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 space-y-2.5">
                        <div className="flex items-center justify-between p-2.5 border border-blue-500/30 rounded-lg bg-blue-900/10">
                            <span className="text-sm text-slate-300">💳 Kreditkarte</span>
                            <span className="text-sm text-blue-400 font-medium">{financialPaymentMethodsData.creditCardPercent}%</span>
                        </div>
                        <div className="flex items-center justify-between p-2.5 border border-green-500/30 rounded-lg bg-green-900/10">
                            <span className="text-sm text-slate-300">📱 Kontaktlos/Mobile</span>
                            <span className="text-sm text-green-400 font-medium">{financialPaymentMethodsData.contactlessMobilePercent}%</span>
                        </div>
                        <div className="flex items-center justify-between p-2.5 border border-amber-500/30 rounded-lg bg-amber-900/10">
                            <span className="text-sm text-slate-300">💵 Bargeld</span>
                            <span className="text-sm text-amber-400 font-medium">{financialPaymentMethodsData.cashPercent}%</span>
                        </div>
                        <div className="flex items-center justify-between p-2.5 border border-purple-500/30 rounded-lg bg-purple-900/10">
                            <span className="text-sm text-slate-300">🏦 EC-Karte</span>
                            <span className="text-sm text-purple-400 font-medium">{financialPaymentMethodsData.debitCardPercent}%</span>
                        </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-slate-800/30 border-slate-700/50">
                        <CardHeader className="pb-2">
                        <CardTitle className="text-slate-100 flex items-center text-base">
                            <RotateCcw className="mr-2 h-5 w-5 text-orange-500" />
                            Retourenmanagement
                        </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 space-y-3">
                        <div className="p-3 border border-orange-500/30 rounded-lg bg-orange-900/10">
                            <p className="text-sm text-slate-300">Retouren diese Woche</p>
                            <p className="text-lg font-semibold text-orange-400">{financialReturnsData.returnsThisWeekCount}</p>
                            <p className="text-xs text-orange-400">{financialReturnsData.returnsPercentOfSales}% der Verkäufe</p>
                        </div>
                        <div className="p-3 border border-red-500/30 rounded-lg bg-red-900/10">
                            <p className="text-sm text-slate-300">Häufigster Grund</p>
                            <p className="text-lg font-semibold text-red-400">{financialReturnsData.mostCommonReason}</p>
                        </div>
                        </CardContent>
                    </Card>
                    </div>
                </CardContent>
                </Card>
            );
      case "datenbank":
        const totalHistoricalPurchases = Object.values(customerHistory).reduce((sum, hist) => sum + (hist?.totalPurchases || 0), 0);
        return (
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader className="border-b border-slate-700/50 pb-3 p-6">
                <CardTitle className="text-slate-100 flex items-center text-xl font-semibold">
                  <Database className="mr-2 h-5 w-5 text-cyan-500" />
                  Produktdatenbank &amp; Kundenverhalten
                  <Badge variant="secondary" className="ml-2 bg-cyan-900/30 text-cyan-400 border-cyan-500/50">
                    {allProductsData.length} Produkte • {totalHistoricalPurchases} Warenkörbe
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-slate-800/30 border-slate-700/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-slate-100 flex items-center text-base">
                        <UsersIcon className="mr-2 h-5 w-5 text-purple-500" />
                        Kundenverhalten Insights (Aggregiert)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-3">
                      <div className="p-3 border border-purple-500/30 rounded-lg bg-purple-900/20">
                        <p className="text-sm text-slate-300">Durchschnittliche Verweildauer (Simuliert)</p>
                        <p className="text-lg font-semibold text-purple-400">18:42 min</p>
                      </div>
                      <div className="p-3 border border-blue-500/30 rounded-lg bg-blue-900/20">
                        <p className="text-sm text-slate-300">Beliebteste Einkaufszeit (Simuliert)</p>
                        <p className="text-lg font-semibold text-blue-400">17:00 - 19:00 Uhr</p>
                      </div>
                      <div className="p-3 border border-green-500/30 rounded-lg bg-green-900/20">
                        <p className="text-sm text-slate-300">Conversion Rate (Warenkorb → Kauf)</p>
                        <p className="text-lg font-semibold text-green-400">94.2%</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-slate-800/30 border-slate-700/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-slate-100 flex items-center text-base">
                        <Brain className="mr-2 h-5 w-5 text-amber-500" />
                        Machine Learning Analysen (Illustrativ)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-3">
                      <div className="p-3 border border-amber-500/30 rounded-lg bg-amber-900/20">
                        <p className="text-sm text-slate-300">Produktassoziationen erkannt</p>
                        <p className="text-lg font-semibold text-amber-400">1,247 Paare</p>
                      </div>
                      <div className="p-3 border border-cyan-500/30 rounded-lg bg-cyan-900/20">
                        <p className="text-sm text-slate-300">Anomalien im Kaufverhalten</p>
                        <p className="text-lg font-semibold text-cyan-400">3 heute</p>
                      </div>
                      <div className="p-3 border border-pink-500/30 rounded-lg bg-pink-900/20">
                        <p className="text-sm text-slate-300">Prognose-Genauigkeit (Absatz)</p>
                        <p className="text-lg font-semibold text-pink-400">97.8%</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
        );
      case "marketing":
        return (
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader className="border-b border-slate-700/50 pb-3 p-6">
                <CardTitle className="text-slate-100 flex items-center text-xl font-semibold">
                  <Sparkles className="mr-2 h-5 w-5 text-cyan-500" />
                  Marketing &amp; Customer Experience
                  <Badge variant="secondary" className="ml-2 bg-pink-900/30 text-pink-400 border-pink-500/50">
                    <UsersIcon className="w-3 h-3 mr-1" />
                    {marketingLoyaltyData.activeMembers.toLocaleString('de-DE')} aktive Loyalty-Mitglieder
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  <Card className="bg-slate-800/30 border-slate-700/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-slate-100 flex items-center text-base">
                        <UsersIcon className="mr-2 h-5 w-5 text-pink-500" />
                        Loyalty-Programm Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                            <p className="text-xs text-slate-500">Aktive Mitglieder</p>
                            <p className="text-lg font-semibold text-pink-400">{marketingLoyaltyData.activeMembers.toLocaleString('de-DE')}</p>
                            <p className="text-xs text-pink-400">+12.3% diesen Monat</p>
                          </div>
                          <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                            <p className="text-xs text-slate-500">Punkte eingelöst</p>
                            <p className="text-lg font-semibold text-purple-400">{marketingLoyaltyData.pointsRedeemedThisWeek.toLocaleString('de-DE')}</p>
                            <p className="text-xs text-purple-400">Diese Woche</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-300">Bronze (0-100 P.)</span>
                            <span className="text-sm text-slate-400">{marketingLoyaltyData.tierDistribution.bronze}%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-300">Silber (101-500 P.)</span>
                            <span className="text-sm text-slate-400">{marketingLoyaltyData.tierDistribution.silver}%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-300">Gold (501+ P.)</span>
                            <span className="text-sm text-slate-400">{marketingLoyaltyData.tierDistribution.gold}%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-slate-800/30 border-slate-700/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-slate-100 flex items-center text-base">
                        <Brain className="mr-2 h-5 w-5 text-cyan-500" />
                        Personalisierte Angebote
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-3">
                      <div className="p-3 border border-cyan-500/30 rounded-lg bg-cyan-900/10">
                        <p className="text-sm text-slate-300">Versendete Angebote heute</p>
                        <p className="text-lg font-semibold text-cyan-400">{marketingPersonalizedOffersData.offersSentToday.toLocaleString('de-DE')}</p>
                        <p className="text-xs text-cyan-400">Öffnungsrate: {marketingPersonalizedOffersData.openRate}%</p>
                      </div>
                      <div className="p-3 border border-green-500/30 rounded-lg bg-green-900/10">
                        <p className="text-sm text-slate-300">Conversion Rate</p>
                        <p className="text-lg font-semibold text-green-400">{marketingPersonalizedOffersData.conversionRate}%</p>
                        <p className="text-xs text-green-400">+5.3% vs. Standard-Angebote</p>
                      </div>
                      <div className="p-3 border border-purple-500/30 rounded-lg bg-purple-900/10">
                        <p className="text-sm text-slate-300">Top Angebotskategorie</p>
                        <p className="text-lg font-semibold text-purple-400">{marketingPersonalizedOffersData.topCategory}</p>
                        <p className="text-xs text-purple-400">23.1% aller Angebote</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-slate-800/30 border-slate-700/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-slate-100 flex items-center text-base">
                        <Activity className="mr-2 h-5 w-5 text-blue-500" />
                        Social Media &amp; Reviews
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-3">
                      <div className="p-3 border border-blue-500/30 rounded-lg bg-blue-900/10">
                        <p className="text-sm text-slate-300">Durchschnittliche Bewertung</p>
                        <p className="text-lg font-semibold text-blue-400">{marketingSocialMediaData.avgRating} ⭐</p>
                        <p className="text-xs text-blue-400">Basierend auf {marketingSocialMediaData.totalReviews.toLocaleString('de-DE')} Reviews</p>
                      </div>
                      <div className="p-3 border border-green-500/30 rounded-lg bg-green-900/10">
                        <p className="text-sm text-slate-300">Social Media Mentions</p>
                        <p className="text-lg font-semibold text-green-400">{marketingSocialMediaData.mentionsToday} heute</p>
                        <p className="text-xs text-green-400">Sentiment: {marketingSocialMediaData.sentimentPositivePercent}% positiv</p>
                      </div>
                      <div className="p-3 border border-amber-500/30 rounded-lg bg-amber-900/10">
                        <p className="text-sm text-slate-300">Influencer Kooperationen</p>
                        <p className="text-lg font-semibold text-amber-400">{marketingSocialMediaData.activeInfluencers} aktiv</p>
                        <p className="text-xs text-amber-400">Reach: {marketingSocialMediaData.influencerReachThisWeek.toLocaleString('de-DE')} diese Woche</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
        );
      case "tap-analytics":
        const tapConversionRate = totalTaps > 0 ? (totalTappedItemsPurchased / totalTaps) * 100 : 0;
        return (
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="border-b border-slate-700/50 pb-3 p-6">
              <CardTitle className="text-slate-100 flex items-center text-xl font-semibold">
                <Smartphone className="mr-2 h-5 w-5 text-cyan-500" />
                Tap &amp; Take Analytics
                <Badge variant="secondary" className="ml-2 bg-blue-900/30 text-blue-400 border-blue-500/50">
                  NFC Performance
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <MetricCard
                  title="Gesamte Taps Heute"
                  value={totalTaps}
                  icon={Smartphone}
                  trend="up"
                  color="cyan"
                  detail="Anzahl der Produktinteraktionen via NFC"
                  isCount
                />
                <MetricCard
                  title="Ø Taps pro aktivem Kunden"
                  value={parseFloat(((getActiveCustomers().filter(c => !c.isAnonymous).length > 0 ? totalTaps / getActiveCustomers().filter(c => !c.isAnonymous).length : 0)).toFixed(1))}
                  icon={UsersIcon}
                  trend="stable"
                  color="blue"
                  detail="Durchschnittliche Taps (nicht-anonyme Kunden)"
                  isCount
                />
                 <MetricCard
                  title="Tap Conversion Rate"
                  value={parseFloat(tapConversionRate.toFixed(1))}
                  icon={CheckCircle2}
                  trend={tapConversionRate > 50 ? "up" : tapConversionRate > 20 ? "stable" : "down"}
                  color="green"
                  detail={`${totalTappedItemsPurchased} von ${totalTaps} getappten Artikeln gekauft`}
                />
                <MetricCard
                  title="Top Getapptes Produkt"
                  value={allProductsData.filter(p=>p.tapCount && p.tapCount > 0).sort((a, b) => (b.tapCount || 0) - (a.tapCount || 0))[0]?.name || "N/A"}
                  icon={Sparkles}
                  color="purple"
                  detail={`(${(allProductsData.sort((a, b) => (b.tapCount || 0) - (a.tapCount || 0))[0]?.tapCount || 0)} Taps)`}
                  isCount={false}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-slate-800/30 border-slate-700/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 flex items-center text-base">
                      <MapPin className="mr-2 h-5 w-5 text-green-500" />
                      Taps pro Ladenbereich (Top 5)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-2">
                    {storeAreas
                      .filter(area => area.nfcTaps > 0)
                      .sort((a, b) => b.nfcTaps - a.nfcTaps)
                      .slice(0, 5)
                      .map(area => (
                        <div key={area.id} className="flex items-center justify-between p-2.5 border border-green-500/20 rounded-lg bg-green-900/10 hover:bg-green-900/20 transition-colors">
                          <div className="flex items-center">
                            <span className="text-2xl mr-2">{area.icon}</span>
                            <span className="text-sm text-slate-200">{area.name}</span>
                          </div>
                          <Badge variant="outline" className="bg-green-800/50 text-green-300 border-green-600/50 text-xs">
                            {area.nfcTaps} Taps
                          </Badge>
                        </div>
                    ))}
                    {storeAreas.filter(area => area.nfcTaps > 0).length === 0 && (
                      <p className="text-slate-500 text-center py-4">Keine NFC Tap Daten für Bereiche verfügbar.</p>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/30 border-slate-700/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 flex items-center text-base">
                      <ShoppingBag className="mr-2 h-5 w-5 text-blue-500" />
                      Top Getappte Produkte (Top 5)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-2">
                    {allProductsData
                      .filter(product => product.tapCount && product.tapCount > 0)
                      .sort((a, b) => (b.tapCount || 0) - (a.tapCount || 0))
                      .slice(0, 5)
                      .map(product => (
                        <div key={product.id} className="flex items-center justify-between p-2.5 border border-blue-500/20 rounded-lg bg-blue-900/10 hover:bg-blue-900/20 transition-colors">
                          <div className="flex items-center">
                            <span className="text-2xl mr-3">{product.image}</span>
                            <div>
                              <span className="text-sm text-slate-200 block">{product.name}</span>
                              <span className="text-xs text-slate-500">{product.category}</span>
                            </div>
                          </div>
                          <Badge variant="outline" className="bg-blue-800/50 text-blue-300 border-blue-600/50 text-xs">
                            {product.tapCount} Taps
                          </Badge>
                        </div>
                    ))}
                    {allProductsData.filter(product => product.tapCount && product.tapCount > 0).length === 0 && (
                       <p className="text-slate-500 text-center py-4">Keine NFC Tap Daten für Produkte verfügbar.</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        );
      case "sicherheit":
        const itemTapS = navItemsList.find(n => n.key === activeNavItem);
        const DefaultIconTapS = itemTapS?.icon || HelpCircle;
        const iconColorKeyTapS = itemTapS ? itemTapS.key.split('-')[0] : 'default';
        return (
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="border-b border-slate-700/50 pb-3 p-6">
              <CardTitle className="text-slate-100 flex items-center text-xl font-semibold">
                {itemTapS && itemTapS.icon && <itemTapS.icon className="mr-2 h-5 w-5 text-cyan-500" />}
                {itemTapS?.label || "Bereich"}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center py-8">
                 <DefaultIconTapS className={`h-16 w-16 ${getCustomerColorClass(iconColorKeyTapS, 'text')} mx-auto mb-4`} />
                <h3 className="text-xl font-semibold text-slate-200 mb-2">{itemTapS?.label || "Ansicht"}</h3>
                <p className="text-slate-400">Inhalte für diesen Bereich werden überarbeitet oder sind in Entwicklung.</p>
              </div>
            </CardContent>
          </Card>
        );
      case "einkaufswagen":
        return (
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="border-b border-slate-700/50 pb-3 p-6">
              <CardTitle className="text-slate-100 flex items-center text-xl font-semibold">
                <ShoppingCart className="mr-2 h-5 w-5 text-cyan-500" />
                Einkaufswagen-Analyse
                <Badge variant="secondary" className="ml-2 bg-green-900/30 text-green-400 border-green-500/50">
                  Live Tracking
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-slate-800/30 border-slate-700/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 flex items-center text-base">
                      <BarChart3 className="mr-2 h-5 w-5 text-green-500" />
                      Conversion Metriken
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="text-sm font-medium text-slate-200">Warenkorb → Kauf</p>
                            <p className="text-xs text-slate-500">{conversionMetricsData.warenkorbZuKaufAbsolut}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline" className="bg-green-900/30 text-green-400 border-green-500/50 text-xs">Hoch</Badge>
                            <p className="text-lg font-semibold text-green-400 mt-1">{conversionMetricsData.warenkorbZuKaufProzent}%</p>
                          </div>
                        </div>
                        <Progress value={conversionMetricsData.warenkorbZuKaufProzent} className="h-2 bg-slate-800 [&>div]:bg-gradient-to-r [&>div]:from-green-500 [&>div]:to-green-400" />
                        <div className="flex justify-between text-xs text-slate-400 mt-1">
                          <span>Erfolgreich: {conversionMetricsData.warenkorbZuKaufErfolgreich}</span>
                          <span>Details</span>
                        </div>
                      </div>
                      <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="text-sm font-medium text-slate-200">Empfehlung → Kauf</p>
                            <p className="text-xs text-slate-500">{conversionMetricsData.empfehlungZuKaufAbsolut}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline" className="bg-purple-900/30 text-purple-400 border-purple-500/50 text-xs">KI</Badge>
                            <p className="text-lg font-semibold text-purple-400 mt-1">{conversionMetricsData.empfehlungZuKaufProzent}%</p>
                          </div>
                        </div>
                        <Progress value={conversionMetricsData.empfehlungZuKaufProzent} className="h-2 bg-slate-800 [&>div]:bg-gradient-to-r [&>div]:from-purple-500 [&>div]:to-purple-400" />
                        <div className="flex justify-between text-xs text-slate-400 mt-1">
                          <span>Angenommen: {conversionMetricsData.empfehlungZuKaufAngenommen}</span>
                          <span>Details</span>
                        </div>
                      </div>
                      <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="text-sm font-medium text-slate-200">Cross-Selling Rate</p>
                            <p className="text-xs text-slate-500">{conversionMetricsData.crossSellingAbsolut}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline" className="bg-blue-900/30 text-blue-400 border-blue-500/50 text-xs">Mittel</Badge>
                            <p className="text-lg font-semibold text-blue-400 mt-1">{conversionMetricsData.crossSellingRateProzent}%</p>
                          </div>
                        </div>
                        <Progress value={conversionMetricsData.crossSellingRateProzent} className="h-2 bg-slate-800 [&>div]:bg-gradient-to-r [&>div]:from-blue-500 [&>div]:to-blue-400" />
                        <div className="flex justify-between text-xs text-slate-400 mt-1">
                          <span>Zusatzverkäufe: {conversionMetricsData.crossSellingZusatzverkaeufe}</span>
                          <span>Details</span>
                        </div>
                      </div>
                      <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="text-sm font-medium text-slate-200">Up-Selling Rate</p>
                            <p className="text-xs text-slate-500">{conversionMetricsData.upSellingAbsolut}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline" className="bg-amber-900/30 text-amber-400 border-amber-500/50 text-xs">Premium</Badge>
                            <p className="text-lg font-semibold text-amber-400 mt-1">{conversionMetricsData.upSellingRateProzent}%</p>
                          </div>
                        </div>
                        <Progress value={conversionMetricsData.upSellingRateProzent} className="h-2 bg-slate-800 [&>div]:bg-gradient-to-r [&>div]:from-amber-500 [&>div]:to-amber-400" />
                        <div className="flex justify-between text-xs text-slate-400 mt-1">
                          <span>Upgrades: {conversionMetricsData.upSellingUpgrades}</span>
                          <span>Details</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/30 border-slate-700/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 flex items-center text-base">
                      <Activity className="mr-2 h-5 w-5 text-red-500" />
                      Abbruch-Analyse
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="p-3 border border-red-500/30 rounded-lg bg-red-900/20">
                        <p className="text-sm text-slate-300">Häufigster Abbruchpunkt</p>
                        <p className="text-lg font-semibold text-red-400">{abbruchAnalyseData.haeufigsterAbbruchpunktText} ({abbruchAnalyseData.haeufigsterAbbruchpunktProzent}%)</p>
                      </div>
                      <div className="p-3 border border-orange-500/30 rounded-lg bg-orange-900/20">
                        <p className="text-sm text-slate-300">Durchschn. Artikel vor Abbruch</p>
                        <p className="text-lg font-semibold text-orange-400">{abbruchAnalyseData.avgArtikelVorAbbruch}</p>
                      </div>
                      <div className="p-3 border border-yellow-500/30 rounded-lg bg-yellow-900/20">
                        <p className="text-sm text-slate-300">Wiederkehr-Rate</p>
                        <p className="text-lg font-semibold text-yellow-400">{abbruchAnalyseData.wiederkehrRateProzent}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        );
      case "ki":
        return (
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="border-b border-slate-700/50 pb-3 p-6">
              <CardTitle className="text-slate-100 flex items-center text-xl font-semibold">
                <Brain className="mr-2 h-5 w-5 text-cyan-500" />
                KI-Empfehlungs-Engine
                <Badge variant="secondary" className="ml-2 bg-purple-900/30 text-purple-400 border-purple-500/50">
                  <Sparkles className="w-3 h-3 mr-1" />
                  {algorithmusPerformanceData.empfehlungsgenauigkeitProzent}% Genauigkeit
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                <Card className="bg-slate-800/30 border-slate-700/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 flex items-center text-base">
                      <BarChart3 className="mr-2 h-5 w-5 text-purple-500" />
                      Algorithmus Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-300">Empfehlungsgenauigkeit</span>
                        <span className="text-sm text-purple-400">{algorithmusPerformanceData.empfehlungsgenauigkeitProzent}%</span>
                      </div>
                      <Progress value={algorithmusPerformanceData.empfehlungsgenauigkeitProzent} className="h-2 bg-slate-700 [&>div]:bg-purple-500" />
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-300">Click-Through Rate</span>
                        <span className="text-sm text-blue-400">{algorithmusPerformanceData.clickThroughRateProzent}%</span>
                      </div>
                      <Progress value={algorithmusPerformanceData.clickThroughRateProzent} className="h-2 bg-slate-700 [&>div]:bg-blue-500" />
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-300">Conversion Rate</span>
                        <span className="text-sm text-green-400">{algorithmusPerformanceData.conversionRateProzent}%</span>
                      </div>
                      <Progress value={algorithmusPerformanceData.conversionRateProzent} className="h-2 bg-slate-700 [&>div]:bg-green-500" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/30 border-slate-700/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 flex items-center text-base">
                      <Sparkles className="mr-2 h-5 w-5 text-amber-500" />
                      Live Training Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="p-3 border border-amber-500/30 rounded-lg bg-amber-900/10">
                        <p className="text-sm text-slate-300">Modell Updates heute</p>
                        <p className="text-lg font-semibold text-amber-400">{liveTrainingStatusData.modellUpdatesHeute}</p>
                      </div>
                      <div className="p-3 border border-cyan-500/30 rounded-lg bg-cyan-900/10">
                        <p className="text-sm text-slate-300">Neue Assoziationen</p>
                        <p className="text-lg font-semibold text-cyan-400">{liveTrainingStatusData.neueAssoziationen}</p>
                      </div>
                      <div className="p-3 border border-pink-500/30 rounded-lg bg-pink-900/10">
                        <p className="text-sm text-slate-300">Erfolgsrate Empfehlungen</p>
                        <p className="text-lg font-semibold text-pink-400">{liveTrainingStatusData.erfolgsrateEmpfehlungenProzent}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/30 border-slate-700/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 flex items-center text-base">
                      <Bell className="mr-2 h-5 w-5 text-green-500" />
                      Echtzeit Push-Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="p-3 border border-green-500/30 rounded-lg bg-green-900/10">
                        <p className="text-sm text-slate-300">Push-Nachrichten heute</p>
                        <p className="text-lg font-semibold text-green-400">{pushPerformanceData.pushNachrichtenHeute}</p>
                        <p className="text-xs text-green-400">{pushPerformanceData.pushNachrichtenGrund}</p>
                      </div>
                      <div className="p-3 border border-blue-500/30 rounded-lg bg-blue-900/20">
                        <p className="text-sm text-slate-300">Reaktionsrate</p>
                        <p className="text-lg font-semibold text-blue-400">{pushPerformanceData.reaktionsRateProzent}%</p>
                        <p className="text-xs text-blue-400">{pushPerformanceData.reaktionsRateAbsolut}</p>
                      </div>
                      <div className="p-3 border border-purple-500/30 rounded-lg bg-purple-900/10">
                        <p className="text-sm text-slate-300">Conversion zu Kauf</p>
                        <p className="text-lg font-semibold text-purple-400">{pushPerformanceData.conversionZuKaufProzent}%</p>
                        <p className="text-xs text-purple-400">{pushPerformanceData.conversionZuKaufAbsolut}</p>
                      </div>
                      <div className="p-3 border border-amber-500/30 rounded-lg bg-amber-900/10">
                        <p className="text-sm text-slate-300">Zusatzumsatz generiert</p>
                        <p className="text-lg font-semibold text-amber-400">€{pushPerformanceData.zusatzumsatzGeneriert.toLocaleString('de-DE')}</p>
                        <p className="text-xs text-amber-400">Ø €{pushPerformanceData.avgUmsatzProPushConversion.toFixed(2)} pro Push-Conversion</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        );
      default:
        const item = navItemsList.find(n => n.key === activeNavItem);
        const DefaultIcon = item?.icon || HelpCircle;
        let iconColorKey = 'default';
        if (item) {
            const colorPart = item.key.split('-')[0];
             const validColors = ['emerald', 'blue', 'purple', 'orange', 'pink', 'cyan', 'green', 'amber'];
            if (validColors.includes(colorPart)) {
                iconColorKey = colorPart;
            }
        }

        return (
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="border-b border-slate-700/50 pb-3 p-6">
                <CardTitle className="text-slate-100 flex items-center text-xl font-semibold">
                {item && item.icon && <item.icon className="mr-2 h-5 w-5 text-cyan-500" />}
                {item?.label || "Bereich"}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center py-8">
                 <DefaultIcon className={`h-16 w-16 ${getCustomerColorClass(iconColorKey, 'text')} mx-auto mb-4`} />
                <h3 className="text-xl font-semibold text-slate-200 mb-2">{item?.label || "Ansicht"}</h3>
                <p className="text-slate-400">Inhalte für diesen Bereich werden überarbeitet oder sind in Entwicklung.</p>
                {activeNavItem === 'tap-analytics' && salesByStoreAreaData && (
                  <div className="mt-4 text-xs text-slate-600">
                    Debug: Sales in Obst & Gemüse: {salesByStoreAreaData.find(s => s.name === 'Obst & Gemüse')?.sales || 'N/A'}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );
    }
  };


  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black to-slate-900 flex items-center justify-center">
        <TechLoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-slate-900 text-slate-100 relative overflow-hidden font-sans">
      <ParticleCanvas />
      <div className="container mx-auto px-2 sm:px-4 py-4 relative z-10 max-w-full">
        <header className="flex items-center justify-between py-4 border-b border-slate-700/50 mb-6">
          <div className="flex items-center space-x-2">
            <Image src="https://placehold.co/32x32.png" alt="Tap & Take OS Placeholder Logo" width={32} height={32} data-ai-hint="logo placeholder" />
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              TAP &amp; TAKE OS
            </span>
          </div>
          <div className="flex items-center space-x-3 sm:space-x-6">
            <div className="hidden md:flex items-center space-x-1 bg-slate-800/50 rounded-full px-3 py-1.5 border border-slate-700/50 backdrop-blur-sm">
              <Search className="h-4 w-4 text-slate-400" />
              <input type="text" placeholder="Suchen..." className="bg-transparent border-none focus:outline-none text-sm w-28 sm:w-40 placeholder:text-slate-500" />
            </div>
            <div className="flex items-center space-x-3">
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-slate-100 h-8 w-8 sm:h-9 sm:w-9">
                      <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="absolute -top-0.5 -right-0.5 h-2 w-2 bg-cyan-500 rounded-full animate-pulse"></span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-slate-800 border-slate-700 text-slate-200"><p>Benachrichtigungen</p></TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-slate-400">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-cyan-500" />
                <span>{formatTime(currentTime)}</span>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-3 lg:col-span-2">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm h-full">
              <CardContent className="p-0">
                 <div className="p-4 border-b border-slate-700/50">
                 </div>
                <nav className="p-2 sm:p-4 space-y-1">
                  {navItemsList.map(item => (
                     <NavItem key={item.key} icon={item.icon} label={item.label} active={activeNavItem === item.key} onClick={() => setActiveNavItem(item.key)} />
                  ))}
                </nav>
                <div className="p-2 sm:p-4 border-t border-slate-700/50">
                  <div className="text-xs text-slate-500 mb-3 font-mono tracking-wider">SYSTEM STATUS</div>
                  <div className="space-y-3">
                    {[
                        { name: "Core Systems", status: systemStatus, color: "cyan" },
                        { name: "KI-Engine", status: aiStatus, color: "purple" },
                        { name: "Netzwerk", status: networkStatus, color: "blue" },
                    ].filter(sys => sys.status !== undefined).map(sys => (
                        <div key={sys.name}>
                            <div className="flex items-center justify-between mb-1"><div className="text-xs text-slate-400 font-medium">{sys.name}</div><div className={`text-xs text-${sys.color}-400 font-mono`}>{sys.status}%</div></div>
                            <div className="h-1.5 sm:h-2 bg-slate-800 rounded-full overflow-hidden"><div className={`h-full bg-gradient-to-r from-${sys.color}-500 to-${sys.color}-400 rounded-full transition-all duration-500`} style={{ width: `${sys.status}%` }} /></div>
                        </div>
                    ))}
                  </div>
                </div>
                <div className="p-2 sm:p-4 border-t border-slate-700/50">
                  <div className="text-xs text-slate-500 mb-3 font-mono tracking-wider">SIMULATION</div>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <Button onClick={startSimulation} disabled={isSimulationRunning} size="sm" className="w-full bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 border-none text-xs h-8"><Play className="w-3 h-3 mr-1" />Start</Button>
                      <Button onClick={stopSimulation} disabled={!isSimulationRunning} variant="outline" size="sm" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 text-xs h-8"><Pause className="w-3 h-3 mr-1" />Stopp</Button>
                    </div>
                    <Button onClick={resetSimulation} variant="outline" size="sm" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 text-xs h-8"><RotateCcw className="w-3 h-3 mr-1" />Reset</Button>
                    <div>
                      <label className="text-xs text-slate-400 block mb-1 font-medium">Tick-Geschwindigkeit:</label>
                      <select value={simulationSpeed} onChange={(e) => setSimulationSpeed(Number(e.target.value))} className="w-full p-1.5 bg-slate-800/50 border border-slate-700/50 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500 text-slate-300" disabled={isSimulationRunning}>
                        <option value={1000}>Sehr schnell (1s/Tick)</option>
                        <option value={2000}>Schnell (2s/Tick)</option>
                        <option value={3000}>Normal (3s/Tick)</option>
                        <option value={5000}>Langsam (5s/Tick)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="col-span-12 md:col-span-9 lg:col-span-10">
            <div className="grid gap-6">
              {renderActiveView()}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="border-b border-slate-700/50 pb-3 p-6">
                  <CardTitle className="text-slate-100 flex items-center text-xl font-semibold">
                    <Activity className="mr-2 h-5 w-5 text-cyan-500" /> Live Tap &amp; Take Aktivitäten
                    <Badge variant="secondary" className="ml-2 bg-green-900/30 text-green-400 border-green-500/50">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1 animate-pulse"></div>Live
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                    {recentActivity.length === 0 ? (
                      <p className="text-slate-500 text-center py-8 italic">Keine Aktivitäten - Starte die Simulation</p>
                    ) : (
                      recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-slate-800/30 rounded-lg border border-slate-700/50 hover:border-slate-600/50 transition-colors">
                          <div className="h-2 w-2 bg-cyan-500 rounded-full animate-pulse flex-shrink-0"></div>
                          <span className="text-sm text-slate-300 flex-1 truncate" title={activity}>{activity}</span>
                          <span className="text-xs text-slate-500 flex-shrink-0">{formatTime(new Date())}</span>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

    