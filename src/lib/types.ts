
export interface Product {
  id: string;
  name: string;
<<<<<<< HEAD
  price: number;
  category: string;
  image?: string; // Emoji or URL
  tapCount?: number;
  nfcEnabled?: boolean; // Assuming products can be NFC enabled
=======
  category: string;
  price: number;
  image: string; // emoji or URL
  associations: string[];
  aisle: string;
  nfcEnabled?: boolean;
  tapCount?: number;
>>>>>>> aff088ea94760212e983f91d86cfaafc69a61753
}

export interface CartItem extends Product {
  quantity: number;
<<<<<<< HEAD
  timestamp: string; // ISO string for date
  addMethod?: 'tap' | string;
  isRecommendation?: boolean;
=======
  timestamp: string; 
  isRecommendation?: boolean;
  addMethod?: 'tap' | 'scan' | 'manual';
>>>>>>> aff088ea94760212e983f91d86cfaafc69a61753
}

export interface ShoppingStep {
  aisle: string;
<<<<<<< HEAD
  action: string;
  productId?: string; // ID of the product to interact with
  duration?: number; // Time in simulation ticks for this step
}

export interface ShoppingScenario {
  id: string;
  name: string;
  description: string;
  steps: ShoppingStep[];
=======
  productId: string;
  duration: number; // in ms
  action: string;
}

export interface AIRecommendation {
  product: Product;
  reason: string;
  confidence: number;
>>>>>>> aff088ea94760212e983f91d86cfaafc69a61753
}

export interface Customer {
  id: string;
  name: string;
<<<<<<< HEAD
  avatar: string; // Emoji
  color?: string; // Color name for UI theming
  cart: CartItem[];
  currentAisle: string;
  currentAction: string;
  progress: number;
  currentStep: number; // Index of the step currently being performed
  scenario: ShoppingStep[];
  isActive: boolean;
  ticksSpentInCurrentStep?: number; // How many global ticks spent in currentStep
  timeToCompleteCurrentStep?: number; // How many global ticks this currentStep requires
  isAnonymous?: boolean;
=======
  avatar: string; // emoji
  color: string; // tailwind color name e.g. "emerald"
  currentAisle: string;
  currentAction: string;
  cart: CartItem[];
  progress: number; // percentage
  scenario: ShoppingStep[];
  currentStep: number;
  isActive: boolean;
  usesTapAndTake?: boolean;
  tapCount?: number;
  avgTapTime?: number;
  nextActionTimestamp?: number;
>>>>>>> aff088ea94760212e983f91d86cfaafc69a61753
}

export interface StoreArea {
  id: string;
  name: string;
  x: number; // percentage
  y: number; // percentage
  width: number; // percentage
  height: number; // percentage
<<<<<<< HEAD
  color: string; // Tailwind bg class
  icon: string; // Emoji
  nfcTaps: number;
}

export interface AIRecommendation {
  product: Product;
  reason: string;
  confidence: number; // 0-100
}

export interface CustomerHistoryEntry {
  date: string; // ISO string for date
  items: string[]; // Product names
  total: number;
}

export interface FavoriteCategory {
  name: string;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
}

export interface CustomerProfile {
  totalPurchases: number;
  avgBasketValue: number;
  favoriteCategories: FavoriteCategory[];
  recentPurchases: CustomerHistoryEntry[];
  patterns: string[];
}

export interface CustomerHistory {
  [customerId: string]: CustomerProfile;
}


// From user types for BI, Marketing, Omnichannel, Financials
=======
  color: string; // tailwind bg class
  icon: string; // emoji
  nfcTaps: number;
}

export interface CanvasParticle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  update: (canvasWidth: number, canvasHeight: number) => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

export interface TapHistoryEntry {
  time: number; // seconds since start
  taps: number; // cumulative taps
}

export interface CustomerHistoryEntry {
  totalPurchases: number;
  avgBasketValue: number;
  favoriteCategories: Array<{ name: string; percentage: number; trend: 'up' | 'down' | 'stable' }>;
  recentPurchases: Array<{ date: string; items: string[]; total: number }>;
  patterns: string[];
}

export type CustomerHistory = Record<string, CustomerHistoryEntry>;


>>>>>>> aff088ea94760212e983f91d86cfaafc69a61753
export interface RegionData {
  region: string;
  revenue: number;
  locations: number;
<<<<<<< HEAD
  trend: number; // Percentage change
=======
  trend: number;
>>>>>>> aff088ea94760212e983f91d86cfaafc69a61753
}

export interface StoreLocationData {
  name: string;
  region: string;
  revenue: number;
<<<<<<< HEAD
  trend: number; // Percentage change
}

export interface SalesData {
  month: string;
  sales: number;
=======
  trend: number;
}

export interface SalesData {
  today: number;
  todayTrend: number;
  thisWeek: number;
  weekTrend: number;
  monthlyTarget: number;
  monthlyProgress: number;
}

export interface ProfitMarginData {
  category: string;
  margin: number;
  color: string; 
>>>>>>> aff088ea94760212e983f91d86cfaafc69a61753
}

export interface CategorySales {
  category: string;
  sales: number;
<<<<<<< HEAD
  color?: string;
}

export interface CustomerSegment {
  name: string;
  size: number; // percentage or count
  value: number; // monetary value
}

export interface NPSDataEntry {
  score: number; // 0-10
  count: number;
}

export interface CSATDataEntry {
  rating: number; // 1-5
  count: number;
}

export interface CampaignData {
  name: string;
  roi: number; // percentage
  reach: number;
}

export interface ChannelPerformance {
  channel: string;
  conversionRate: number;
  costPerAcquisition: number;
}

export interface FinancialMetric {
  name: string;
  value: number;
  unit: string; // e.g., "€", "%"
  trend?: number; // Percentage change
}

export interface ProfitMarginData {
  category: string;
  margin: number; // percentage
  color?: string;
}
=======
}

>>>>>>> aff088ea94760212e983f91d86cfaafc69a61753

export interface RegionalMarketAnalysis {
  marketShare: number;
  marketShareTrend: number;
<<<<<<< HEAD
  competitionLevel: 'Hoch' | 'Mittel' | 'Niedrig';
=======
  competitionLevel: string;
>>>>>>> aff088ea94760212e983f91d86cfaafc69a61753
  competitors: number;
  topTrend: string;
  topTrendGrowth: number;
}

export interface ABTestingResult {
  name: string;
  area: string;
<<<<<<< HEAD
  metric: string;
  impact: number; // percentage
=======
  impact: number;
  metric: string;
>>>>>>> aff088ea94760212e983f91d86cfaafc69a61753
}

export interface SeasonalityTrend {
  currentSeason: string;
  topCategory: string;
<<<<<<< HEAD
  topCategoryTrend: number; // percentage
  seasonalProducts: string[];
  seasonalProductTrend: number; // percentage
  nextSeasonForecast: number; // percentage
=======
  topCategoryTrend: number;
  seasonalProducts: string[];
  seasonalProductTrend: number;
  nextSeasonForecast: number;
>>>>>>> aff088ea94760212e983f91d86cfaafc69a61753
}

export interface StoreComparison {
  avgRevenuePerSqFt: number;
  avgCustomersPerDay: number;
  avgBasketValue: number;
  conversionRate: number;
  employeeSatisfactionRate: number;
  inventoryTurnoverRate: number;
}

<<<<<<< HEAD
export interface MarketingLoyaltyData {
  activeMembers: number;
  pointsRedeemedThisWeek: number;
  tierDistribution: {
    bronze: number; // percentage
    silver: number; // percentage
    gold: number; // percentage
  };
=======
export interface CustomerSegment {
  name: string;
  percentage: number;
  description: string;
  avgBasketValue: number;
  topCategory: string;
}

export interface NPSDataEntry {
  score: number;
  count: number;
}

export interface CSATDataEntry {
  rating: number;
  count: number;
}

export interface CampaignData {
  name: string;
  channel: string;
  reach: number;
  conversionRate: number;
  roi: number;
}

export interface ChannelPerformance {
  channel: string;
  sessions: number;
  conversionRate: number;
  revenue: number;
}


export interface MarketingData {
  totalSpend: number;
  campaignsActive: number;
  customerAcquisitionCost: number;
  customerLifetimeValue: number;
}

export interface OmnichannelData {
  onlineSales: number;
  instoreSales: number;
  clickAndCollectOrders: number;
  crossChannelConversionRate: number;
}

export interface FinancialData {
  totalRevenue: number;
  netProfit: number;
  profitMargin: number;
  operatingExpenses: number;
}

export interface MarketingLoyaltyData {
  activeMembers: number;
  pointsRedeemedThisWeek: number;
  tierDistribution: { bronze: number; silver: number; gold: number };
>>>>>>> aff088ea94760212e983f91d86cfaafc69a61753
}

export interface MarketingPersonalizedOffersData {
  offersSentToday: number;
<<<<<<< HEAD
  openRate: number; // percentage
  conversionRate: number; // percentage
=======
  openRate: number;
  conversionRate: number;
>>>>>>> aff088ea94760212e983f91d86cfaafc69a61753
  topCategory: string;
}

export interface MarketingSocialMediaData {
<<<<<<< HEAD
  avgRating: number; // 1-5
=======
  avgRating: number;
>>>>>>> aff088ea94760212e983f91d86cfaafc69a61753
  totalReviews: number;
  mentionsToday: number;
  sentimentPositivePercent: number;
  activeInfluencers: number;
  influencerReachThisWeek: number;
}

export interface OmnichannelClickCollectData {
  ordersToday: number;
  readyForPickup: number;
  avgProcessingTimeMinutes: number;
<<<<<<< HEAD
  onTimePickupRate: number; // percentage
  satisfactionRate: number; // 1-5
}

export interface OmnichannelEcommerceData {
  onlineOrdersToday: number;
  onlineRevenueToday: number;
  onlineRevenueTrend: number; // percentage
  liveCustomersVisibleInStore: number;
  crossChannelConversionRate: number; // percentage
=======
  onTimePickupRate: number;
  satisfactionRate: number;
}
export interface OmnichannelEcommerceData {
  onlineOrdersToday: number;
  onlineRevenueToday: number;
  onlineRevenueTrend: number; 
  liveCustomersVisibleInStore: number;
  crossChannelConversionRate: number; 
>>>>>>> aff088ea94760212e983f91d86cfaafc69a61753
}

export interface OmnichannelUnifiedJourneyData {
  customersWithUnifiedProfile: number;
<<<<<<< HEAD
  personalizationActiveRate: number; // percentage
=======
  personalizationActiveRate: number; 
>>>>>>> aff088ea94760212e983f91d86cfaafc69a61753
  syncedCarts: number;
}

export interface OmnichannelMobileAppData {
  activeUsers: number;
  inStoreNavigationUsers: number;
  inAppPurchasesRevenue: number;
<<<<<<< HEAD
  inAppPurchasesPercentOfOnline: number; // percentage
=======
  inAppPurchasesPercentOfOnline: number; 
>>>>>>> aff088ea94760212e983f91d86cfaafc69a61753
}

export interface OmnichannelInventorySyncData {
  syncStatusPercent: number;
  availabilityUpdatesToday: number;
  outOfStockAlertsToOnline: number;
}

export interface OmnichannelSocialCommerceData {
  instagramSalesRevenue: number;
  instagramSalesCount: number;
  tiktokSalesRevenue: number;
  tiktokSalesGrowthPercent: number;
  liveShoppingRevenue: number;
}

export interface FinancialCashflowData {
  revenueToday: number;
<<<<<<< HEAD
  revenueTrend: number; // percentage
  expensesToday: number;
  expensesCategory: string;
  netCashflow: number;
  profitMargin: number; // percentage
=======
  revenueTrend: number; 
  expensesToday: number;
  expensesCategory: string; 
  netCashflow: number;
  profitMargin: number;
>>>>>>> aff088ea94760212e983f91d86cfaafc69a61753
}

export interface FinancialPaymentMethodsData {
  creditCardPercent: number;
  contactlessMobilePercent: number;
  cashPercent: number;
  debitCardPercent: number;
}

export interface FinancialReturnsData {
  returnsThisWeekCount: number;
<<<<<<< HEAD
  returnsPercentOfSales: number; // percentage
  mostCommonReason: string;
}

export interface ConversionMetricsData {
  warenkorbZuKaufProzent: number;
  warenkorbZuKaufAbsolut: string;
  warenkorbZuKaufErfolgreich: number;
  empfehlungZuKaufProzent: number;
  empfehlungZuKaufAbsolut: string;
  empfehlungZuKaufAngenommen: number;
  crossSellingRateProzent: number;
  crossSellingAbsolut: string;
  crossSellingZusatzverkaeufe: number;
  upSellingRateProzent: number;
  upSellingAbsolut: string;
=======
  returnsPercentOfSales: number;
  mostCommonReason: string;
}

export interface FinancialMetric { 
  label: string;
  value: string;
}

// New types for Einkaufswagen-Analyse
export interface ConversionMetricsData {
  warenkorbZuKaufProzent: number;
  warenkorbZuKaufAbsolut: string; // e.g., "1.247 / 1.396 Warenkörbe"
  warenkorbZuKaufErfolgreich: number;
  empfehlungZuKaufProzent: number;
  empfehlungZuKaufAbsolut: string; // e.g., "423 / 624 Empfehlungen"
  empfehlungZuKaufAngenommen: number;
  crossSellingRateProzent: number;
  crossSellingAbsolut: string; // e.g., "289 / 845 Gelegenheiten"
  crossSellingZusatzverkaeufe: number;
  upSellingRateProzent: number;
  upSellingAbsolut: string; // e.g., "156 / 624 Premium-Angebote"
>>>>>>> aff088ea94760212e983f91d86cfaafc69a61753
  upSellingUpgrades: number;
}

export interface AbbruchAnalyseData {
  haeufigsterAbbruchpunktText: string;
  haeufigsterAbbruchpunktProzent: number;
  avgArtikelVorAbbruch: number;
  wiederkehrRateProzent: number;
}

<<<<<<< HEAD
=======
// New types for KI-Empfehlungs-Engine
>>>>>>> aff088ea94760212e983f91d86cfaafc69a61753
export interface AlgorithmusPerformanceData {
  empfehlungsgenauigkeitProzent: number;
  clickThroughRateProzent: number;
  conversionRateProzent: number;
}

export interface LiveTrainingStatusData {
  modellUpdatesHeute: number;
  neueAssoziationen: number;
  erfolgsrateEmpfehlungenProzent: number;
}

export interface PushPerformanceData {
  pushNachrichtenHeute: number;
  pushNachrichtenGrund: string;
  reaktionsRateProzent: number;
  reaktionsRateAbsolut: string;
  conversionZuKaufProzent: number;
  conversionZuKaufAbsolut: string;
  zusatzumsatzGeneriert: number;
  avgUmsatzProPushConversion: number;
}
<<<<<<< HEAD

// New types for Customer Insights
export interface AgeDistributionEntry {
  range: string;
  percentage: number;
  color: string; 
}

export interface GenderDistributionData {
  malePercent: number;
  femalePercent: number;
  otherPercent: number;
}

export interface CustomerDemographicsData {
  ageDistribution: AgeDistributionEntry[];
  genderDistribution: GenderDistributionData;
  avgCustomerLifetimeValue: number;
  newVsReturningCustomers: { new: number; returning: number }; // percentages
}

export interface RelationshipInsightData {
  estimatedCouplesCount: number;
  commonPairPurchases: { item1: string; item2: string; frequency: 'Hoch' | 'Mittel' | 'Niedrig' }[];
  estimatedFamilyCount: number;
  typicalFamilyProducts: string[];
}

export interface CustomerSegmentsData {
  name: string;
  description: string;
  percentage: number;
  keyCharacteristics: string[];
  color: string;
}
=======
>>>>>>> aff088ea94760212e983f91d86cfaafc69a61753
